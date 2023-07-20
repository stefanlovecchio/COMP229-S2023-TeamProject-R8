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
router.post('/details', surveyController.processAddPage);

// Get Route for displaying the Edit page - UPDATE Operation
router.get('/edit/:id',  surveyController.displayEditPage);

// Post Route for processing the Edit page - UPDATE Operation
router.post('/edit/:id', surveyController.processEditPage);

// Get to perform Deletion - Delete Operation
router.get('/delete/:id',  surveyController.performDelete);

module.exports = router;