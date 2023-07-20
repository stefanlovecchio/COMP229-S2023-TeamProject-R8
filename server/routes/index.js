var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET serveys page. */
<<<<<<< Updated upstream
//router.get('/surveys', indexController.displaySurveysPage);

/* GET serveys detail page. */
//router.get('/details', indexController.displaySurveysdetailsPage);
=======
router.get('/surveys', indexController.displaySurveysPage);

/* GET serveys detail page. */
router.get('/details', indexController.displayDetailsPage);

/* GET home page. */
router.get('/login', indexController.displayLoginPage);

/* GET home page. */
router.post('/login', indexController.processLoginPage);

/* GET home page. */
router.get('/register', indexController.displayRegisterPage);

/* GET home page. */
router.post('/register', indexController.processRegisterPage);

/* GET home page. */
router.post('/logout', indexController.performLogout);
>>>>>>> Stashed changes

module.exports = router;