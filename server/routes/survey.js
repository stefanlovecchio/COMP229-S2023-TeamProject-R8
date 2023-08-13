let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Survey = require('../models/survey');

let surveyController = require('../controllers/survey');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Survey List page - READ Operation */
router.get('/surveys', surveyController.displaySurveysPage);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/details', requireAuth, surveyController.displayDetailsPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/details', requireAuth, surveyController.processAddPage);

// Get Route for displaying the Edit page - UPDATE Operation
router.get('/edit/:id', requireAuth,  surveyController.displayEditPage);

// Post Route for processing the Edit page - UPDATE Operation
router.post('/edit/:id', requireAuth, surveyController.processEditPage);

// Get to perform Deletion - Delete Operation
router.get('/delete/:id', requireAuth, surveyController.performDelete);

router.get('/takeSurvey/:id', surveyController.displayTakeSurveyPage);

router.post('/:id/process', surveyController.processTakeSurveyPage);

router.get('/results/:id', surveyController.displayResultsPage);

module.exports = router;