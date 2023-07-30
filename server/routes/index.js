var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);



/* GET home page. */
router.get('/login', indexController.displayLoginPage);

/* GET home page. */
router.post('/login', indexController.processLoginPage);

/* GET home page. */
router.get('/register', indexController.displayRegisterPage);

/* GET home page. */
router.post('/register', indexController.processRegisterPage);

/* Get to perform UserLogout */
router.get('/logout', indexController.performLogout);


module.exports = router;