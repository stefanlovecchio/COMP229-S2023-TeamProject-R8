var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET serveys page. */
//router.get('/surveys', indexController.displaySurveysPage);

/* GET serveys detail page. */
//router.get('/details', indexController.displaySurveysdetailsPage);

module.exports = router;