let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create a reference to the model
let Survey = require('../models/survey');

//create logic to display the main list of sureveys
module.exports.displaySurveyPage = async (req, res, next) => {
    try {
        let surveyList = await Survey.find();
        res.render('surveys/index', { title: 'Survey List', SurveyList: surveyList });
    } catch (err) {
        console.error(err);
    }
}
    
//create logic to create a new survey and details
module.exports.displayDetailsPage = (req, res, next) => {
    res.render('surveys/details', { title: 'Survey Details' });
}

module.exports.processDetailsPage = (req, res, next) => {
    let newSurvey = Survey({
        "Title": req.body.Title,
        "Description": req.body.Description,
        "NumberMCQuestions": req.body.NumberMCQuestions,
        "NumberSCQuestions": req.body.NumberSCQuestions,
        "NumberAnswers": req.body.NumberAnswers
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/survey-list');
        }
    });

}

