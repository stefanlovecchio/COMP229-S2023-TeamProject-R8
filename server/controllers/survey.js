let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create a reference to the model
let Survey = require('../models/survey');


//create logic to display the main list of surveys
<<<<<<< Updated upstream
module.exports.displaySurveyPage = async (req, res, next) => {
    try {
        let surveyList = await Survey.find();
        res.render('surveys/index', 
        { title: 'Survey List', 
        surveys: surveyList });
        
    } catch (err) {
        console.error(err);
    }
};
    
//create logic to create a new survey and details
module.exports.displayDetailsPage = (req, res, next) => {
    res.render('surveys/details', { title: 'Survey Creator' });
=======

module.exports.displaySurveyPage = async (req, res, next) => {
    try {
        let surveyList = await Survey.find();
        res.render('surveys/index', {
            title: 'Survey List',
            SurveyList: surveyList // Pass the surveyList variable here
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving survey list');
    }
};


    
//create logic to create a new survey and details
module.exports.displayDetailsPage = (req, res, next) => {
    res.render('surveys/details', { title: 'Survey Details' });
>>>>>>> Stashed changes
}


    module.exports.processAddPage = (req, res, next) => {
        let newSurvey = new Survey({
<<<<<<< Updated upstream
            "title": req.body.title,
            "description": req.body.description,
            questions: req.body.questions,
=======
            "Title": req.body.Title,
            "Description": req.body.Description,
            "NumberMCQuestions": req.body.NumberMCQuestions,
            "NumberSCQuestions": req.body.NumberSCQuestions,
            "NumberAnswers": req.body.NumberAnswers,
            "numQuestions": req.body.numQuestions,
>>>>>>> Stashed changes
        });
    
        Survey.create(newSurvey).then((survey) => {
            console.log(survey);
<<<<<<< Updated upstream
            res.redirect('/surveys');
        }).catch((err) => {
            console.log(err);
        });

    };

    
    module.exports.displayEditPage = async (req, res, next) => {
        let id = req.params.id;
        
        console.log("id from params:", id);
    
        // You can also validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Invalid id");
            // Here you can decide what to do when id is invalid. You might redirect to an error page or send a specific error message.
        }

        try {
            let surveyToEdit = await Survey.findById(id);
            res.render('surveys/edit', 
            {title: surveyToEdit.title,  
                survey: surveyToEdit});
                //console.log(surveyToEdit);
=======
            res.redirect('surveys');
        }).catch((err) => {
            console.log(err);
        });
        
    
    };
    
    module.exports.displayEditPage = async (req, res, next) => {
        let id = req.params.id;
    
        try {
            let surveyToEdit = await Survey.findById(id);
                    console.log(req.body);
            res.render('surveys/edit', 
            {title: surveyToEdit.Title,  
            survey: surveyToEdit});
>>>>>>> Stashed changes
        } catch(err) {
            console.log(err);
            res.status(500).send(err);
        }
    };
    
    module.exports.processEditPage = async (req, res, next) => {
<<<<<<< Updated upstream
        let id = req.params.id;
        try {
            //console.log(JSON.stringify(req.body));
            // Use the ID in the body of the request to find the survey
            const survey = await Survey.findById(id);
            
            if (!survey) {
                return res.status(404).json({ message: 'Survey not found' });
            }
            
            // Update the survey
            survey.title = req.body.title;
            survey.description = req.body.description;
            survey.questions = req.body.questions;
            
        
            // Save the survey
            const updatedSurvey = await survey.save();
            
            //return res.status(200).json(updatedSurvey);
            res.redirect('/surveys');
          } catch (err) {
            console.log(err);  // debug line
            return res.status(500).json({ error: err.message });
          }
        };
        
=======
  let id = req.params.id;

  let updatedSurvey = {
    Title: req.body.Title,
    Description: req.body.Description,
    Questions: []
  };

  for (let count = 0; count < req.body.numQuestions; count++) {
    let question = {
      question: req.body[`question${count}`],
      answers: []
    };

    for (let i = 0; i < req.body[`numAnswers${count}`]; i++) {
      let answer = req.body[`answer${count}_${i}`];
      question.answers.push(answer);
    }

    updatedSurvey.Questions.push(question);
  }

  try {
    await Survey.updateOne({ _id: id }, updatedSurvey);
    res.redirect('/surveys');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
>>>>>>> Stashed changes

      
      
      
      
      
    
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

<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
