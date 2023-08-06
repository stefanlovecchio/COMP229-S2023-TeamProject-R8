let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displayDetailsPage = (req, res, next) => {
    res.render('surveys/details', { title: 'Survey Creator',
    displayName: req.user ? req.user.displayName : '' });
}

//create logic to display the main list of surveys
module.exports.displaySurveysPage = async (req, res, next) => {
  try {
    let surveyList = await Survey.find();
        res.render('surveys/index', 
        { title: 'Survey List', 
        displayName: req.user ? req.user.displayName : '',
        surveys: surveyList });
        
    } catch (err) {
        console.error(err);
    }
};
    
//create logic to create a new survey and details


    module.exports.processAddPage = (req, res, next) => {
      console.log(req.body);
            const date = new Date(Date.now());
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            console.log(date.toLocaleDateString('en-US', options));
        let newSurvey = new Survey({
            "created": date.toLocaleDateString('en-US', options),
            "title": req.body.title,
            "description": req.body.description,
            "author": req.user.displayName,
            questions: req.body.questions,
        });
    
        Survey.create(newSurvey).then((survey) => {
            console.log(survey);
            res.redirect('/surveys');
        }).catch((err) => {
            console.log(err);
        });

    };

    
    module.exports.displayEditPage = async (req, res, next) => {
        let id = req.params.id;
        
        // You can also validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Invalid id");
            // Here you can decide what to do when id is invalid. You might redirect to an error page or send a specific error message.
        }

        try {
            let surveyToEdit = await Survey.findById(id);
            res.render('surveys/edit', 
            {title: surveyToEdit.title, 
              displayName: req.user ? req.user.displayName : '', 
                survey: surveyToEdit});
              } catch(err) {
                console.log(err);
                res.status(500).send(err);
              }
            };
            
            module.exports.processEditPage = async (req, res, next) => {
              let id = req.params.id;
              console.log(JSON.stringify(req.body));
              try {
                // Use the ID in the body of the request to find the survey
                const survey = await Survey.findById(id);
                
                if (!survey) {
                  return res.status(404).json({ message: 'Survey not found' });
                }
                
                // Update the survey
                survey.title = req.body.title;
                survey.description = req.body.description;
                survey.questions = req.body.questions;
                console.log(survey);
            
        
            // Save the survey
            const updatedSurvey = await survey.save();
            
            //return res.status(200).json(updatedSurvey);
            res.redirect('/surveys');
          } catch (err) {
            console.log(err);  // debug line
            return res.status(500).json({ error: err.message });
          }
        };
    
    module.exports.performDelete = async (req, res, next) => {
        let id = req.params.id;
    
        try {
            await Survey.findByIdAndRemove(id);
            res.redirect('/surveys');
        } catch(err) {
            console.log(err);
            res.status(500).send(err);
        }
    };

    function isRequestBodyValid(body) {
        // Check that body contains a 'questions' property
        if (!body.questions) {
          return false;
        }
      
        // Check that 'questions' is an array
        if (!Array.isArray(body.questions)) {
          return false;
        }
      
        // Check each question in the array
        for (let question of body.questions) {
          // Check that 'questionText' property exists and is a string
          if (!question.questionText || typeof question.questionText !== 'string') {
            return false;
          }
      
          // Check that 'answers' property exists and is an array
          if (!question.answers || !Array.isArray(question.answers)) {
            return false;
          }
      
          // Check each answer in the array
          for (let answer of question.answers) {
            // Check that 'answerText' property exists and is a string
            if (!answer.answerText || typeof answer.answerText !== 'string') {
              return false;
            }
          }
        }
      
        // If all checks pass, return true
        return true;
      }