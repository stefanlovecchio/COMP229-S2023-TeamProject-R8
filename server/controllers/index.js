
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');



module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home' });
}

module.exports.displaySurveysPage = (req, res, next) => {
    res.render('surveys/index', { title: 'Survey List' });
}

//this is routing to the home page as well?

