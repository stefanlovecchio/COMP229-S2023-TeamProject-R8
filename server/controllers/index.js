
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home' });
}

module.exports.displaySurveysPage = (req, res, next) => {
    res.render('surveys/index', { title: 'Survey List' });
}

//this is routing to the home page as well?

module.exports.displayDetailsPage = (req, res, next) => {
    res.render('surveys/details', { title: 'Survey Details' });
}


module.exports.displayLoginPage = (req,res,next)=> {
    //checke if the user is ready for login
    if(!req.User)
    {
        res.render('auth/login',
        {
            title:"Login",
            messages:req.flash('loginMessages'),
            displayname: req.use ? req.user.displayname:''
        });
    }
    else{
        return res.redirect('/');
    }

}

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local',
    (err,user,info) =>{
        //server err?
        if(err){
            return next (err);

        }
        //is there a user err?
        if(!user){

            req.flash('loginMessages','Authentication Error');
            return res.redirect('/login');
        }
        req.login(user,(err)=>{

            //server err?
            if(err){
                return next(err);
            }
            return res.redirect('/surveys')

        });
    })(req,res,next);
    
}

module.exports.displayRegisterPage  = (req,res,next)=> {
    //checke if the user is not already login
    if(!req.User)
    {
        res.render('auth/register',
        {
            title:"Register",
            messages:req.flash('registerMessages'),
            displayname: req.use ? req.user.displayname:''
        });
    }
    else{
        return res.redirect('/surveys');
    }

}

module.exports.processRegisterPage = (req,res,next)=> {
 //inintialize an user object 
 let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayname: req.body.displayname
 });
 User.register(newUser,req.body.password,(err)=>{
    if(err){
        console.log(err);
        if(err.name == 'UserExistsError'){
            req.flash(
                'registerMessage',
                'Registration Error: User Already Exists!'

            );
            console.log('Error: User Already Exists!'
            );
        }
        return res.render('auth/register',
        {
            title:"Register",
            messages: req.flash('registerMessages'),
            displayname:req.user ? req.user.displayname:''
        });
    }
    else{
        //if registration success
        return passport.authenticate('local')(req,res,()=>{
            req.redirect('/survey')
        });
    }
 });
}

module.exports.performLogout = (req,res,next) => {
    req.logout((err)=>{
        if(err){
            //handle err here
            console.log(err);
            return next(err);
        }
    return res.redirect('/');
    });
}
