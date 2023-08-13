let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

// create a reference to the model
let Survey = require("../models/survey");
//create a reference to the results model
let resultsModel = require("../models/results");

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

//process take survey page
module.exports.processTakeSurveyPage = async (req, res, next) => {
  let id = req.params.id;
  console.log("process take survey page: " + JSON.stringify(req.body));
  const responses = req.body.questions;
  //if only one answer, make it an array to conform to the schema
  responses.forEach((question) => {
    if (question.answer) {
      question.answers = [question.answer];
      delete question.answer;
    }
  });
  //save to Results object
  try {
    let newResult = new resultsModel({
      //if user signed in, save displayName and userId
      displayName: req.user ? req.user.displayName : "",
      userId: req.user ? req.user._id : null,
      surveyId: id,
      title: req.body.title,
      questions: responses,
    });
    resultsModel.create(newResult);
    res.redirect(`/results/${id}`);
  } catch (err) {
    console.log(err); // debug line
    return res.status(500).json({ error: err.message });
  }
};

module.exports.displayResultsPage = async (req, res, next) => {
  /* let id = req.params.id;
      // You can also validate the id
       if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid id");
    }
  } */
  const surveyId = req.params.id;

  // Fetch survey data by ID
  Survey.findById(surveyId)
    .then((survey) => {
      res.render("surveys/results", { title: survey.title, survey });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};

