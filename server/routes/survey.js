let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Survey = require('../models/survey');

let surveyController = require('../controllers/survey');

/* GET Route for the Survey List page - READ Operation */
router.get('/surveys', surveyController.displaySurveyPage);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/details', surveyController.displayDetailsPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/details', surveyController.processDetailsPage);

module.exports = router;