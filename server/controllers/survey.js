let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create a reference to the model
let Survey = require('../models/survey');


//create logic to display the main list of surveys
module.exports.displaySurveyPage = async (req, res, next) => {
    try {
        let surveyList = await Survey.find();
        res.render('surveys/index', 
        { title: 'Survey List', 
        SurveyList: surveyList });
        res.json(bookList);
    } catch (err) {
        console.error(err);
    }
};
    
//create logic to create a new survey and details
module.exports.displayDetailsPage = (req, res, next) => {
    res.render('surveys/details', { title: 'Survey Details' });
}


    module.exports.processAddPage = (req, res, next) => {
        let newSurvey = new Survey({
            "Title": req.body.Title,
            "Description": req.body.Description,
            "NumberMCQuestions": req.body.NumberMCQuestions,
            "NumberSCQuestions": req.body.NumberSCQuestions,
            "NumberAnswers": req.body.NumberAnswers,
            "numQuestions": req.body.numQuestions,
        });
    
        Survey.create(newSurvey).then((survey) => {
            console.log(survey);
            res.redirect('surveys');
        }).catch((err) => {
            console.log(err);
        });
        
    
    };
    
    module.exports.displayEditPage = async (req, res, next) => {
        let id = req.params.id;
    
        try {
            let surveyToEdit = await Survey.findById(id);
            res.render('surveys/edit', 
            {title: 'Edit Survey', 
            survey: surveyToEdit});
        } catch(err) {
            console.log(err);
            res.status(500).send(err);
        }
    };
    
    module.exports.processEditPage = async (req, res, next) => {
        let id = req.params.id
    
        let updatedSurvey = {
            "_id": id,
            "Title": req.body.Title,
            "Description": req.body.Description,
            //"NumberMCQuestions": req.body.NumberMCQuestions,
            //"NumberSCQuestions": req.body.NumberSCQuestions,
            "NumberAnswers": req.body.NumberAnswers,
            "questions.length": req.body.numQuestions,
            "answers": req.body.answers
        };
    
        try {
            await Survey.updateOne({_id: id}, updatedSurvey);
            res.redirect('/surveys');
    
        } catch(err) {
            console.log(err);
            res.status(500).send(err);
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

