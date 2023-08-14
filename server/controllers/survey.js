let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// create a reference to the model
let Survey = require("../models/survey");
//create a reference to the results model
let ResultsModel = require('../models/results');

//display the add survey page
module.exports.displayDetailsPage = (req, res, next) => {
  res.render("surveys/details", {
    title: "Survey Creator",
    displayName: req.user ? req.user.displayName : "",
  });
};

// display the list of surveys
module.exports.displaySurveysPage = async (req, res, next) => {
  try {
    let surveyList = await Survey.find();
    res.render("surveys/index", {
      title: "Survey List",
      displayName: req.user ? req.user.displayName : "",
      surveys: surveyList,
    });
  } catch (err) {
    console.error(err);
  }
};

//logic to create a new survey
module.exports.processAddPage = (req, res, next) => {
  //get date created
  const date = new Date(Date.now());
  const options = { year: "numeric", month: "long", day: "numeric" };
  let newSurvey = new Survey({
    created: date.toLocaleDateString("en-US", options),
    title: req.body.title,
    description: req.body.description,
    min: req.body.min,
    max: req.body.max,
    author: req.user.displayName,
    questions: req.body.questions,
  });
  //create survey
  Survey.create(newSurvey)
    .then((survey) => {
      res.redirect("/surveys");
    })
    .catch((err) => {
      console.log(err);
    });
};

// display the edit page
module.exports.displayEditPage = async (req, res, next) => {
  let id = req.params.id;
  try {
    let surveyToEdit = await Survey.findById(id);
    res.render("surveys/edit", {
      title: surveyToEdit.title,
      displayName: req.user ? req.user.displayName : "",
      survey: surveyToEdit,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

//update the survey
module.exports.processEditPage = async (req, res, next) => {
  let id = req.params.id;
  try {
    // Use the ID in the body of the request to find the survey
    const survey = await Survey.findById(id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    // Save the survey with the new data
    survey.title = req.body.title;
    survey.description = req.body.description;
    survey.questions = req.body.questions;
    const updatedSurvey = await survey.save();
    res.redirect("/surveys");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

//delete a survey
module.exports.performDelete = async (req, res, next) => {
  let id = req.params.id;
  try {
    await Survey.findByIdAndRemove(id);
    res.redirect("/surveys");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

//display take survey page
module.exports.displayTakeSurveyPage = async (req, res, next) => {
  let id = req.params.id;
  try {
    let selectedSurvey = await Survey.findById(id);
    res.render("surveys/takeSurvey", {
      title: selectedSurvey.title,
      displayName: req.user ? req.user.displayName : "",
      survey: selectedSurvey,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

    module.exports.processTakeSurveyPage = async (req, res, next) => {
      let id = req.params.id;
      console.log('process take survey page: ' + JSON.stringify(req.body));
      const responses = req.body.questions;
      
      // Logging the responses before modifying them
  console.log('Original Responses:', responses);
      
      //if only one answer, make it an array to conform to the schema
      responses.forEach(question => {
        if (question.answer) {
          question.answers = [question.answer];
          delete question.answer;
        }
      });

      // Logging the modified responses
  console.log('Modified Responses:', responses);

              try {
                const newResult = new ResultsModel({
                  displayName: req.user ? req.user.displayName : '',
                  surveyId: id,
                  title: req.body.title,
                  questions: responses
                });

                await newResult.save();

        
    // Logging the saved result
    console.log('Saved Result:', newResult);

                res.redirect(`/results/${id}`);
              } catch (err) {
                console.log(err);  // debug line
                return res.status(500).json({ error: err.message });
              }
            };

    module.exports.displayResultsPage = async (req, res, next) => {
  const surveyId = req.params.id;

  try {
    const survey = await Survey.findById(surveyId);

    if (!survey) {
      return res.status(404).send('Survey not found');
    }

    const results = await ResultsModel.findOne({ surveyId: survey });

    if (!results) {
      return res.status(404).send('Survey results not found');
    }

    for (let i = 0; i < results.questions.length; i++) {
      const questionText = survey.questions[i].question;
      const userAnswers = results.questions[i].answers;

      console.log(`Question ${i + 1}: ${questionText}`);
      console.log(`User's answers: ${userAnswers}`);
    }

    res.render('surveys/results', { title: survey.title, survey: survey, results: results });
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).send('Internal Server Error');
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