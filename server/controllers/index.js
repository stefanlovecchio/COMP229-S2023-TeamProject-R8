
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');



module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home' });
}




