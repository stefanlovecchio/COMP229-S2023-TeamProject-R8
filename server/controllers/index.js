
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayLoginPage = (req,res,next)=> {
    //checke if the user is ready for login
    if(!req.User)
    {
        res.render('auth/login',
        {
            title:"Login",
            messages:req.flash('loginMessage'),
            displayname: req.user ? req.user.displayname:''
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
            req.flash('loginMessage','Authentication Error');
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
            messages:req.flash('registerMessage'),
            displayName: req.use ? req.user.displayName:''
        });
    }
    else{
        return res.redirect('/');
    }

}

module.exports.processRegisterPage = (req,res,next) => {
    console.log(req.body);
 //inintialize an user object 
 let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName
 });
 User.register(newUser, req.body.password, (err) => {
    if(err){
        console.log(err);
        console.log("Error: Inserting New User");
        if(err.name == 'UserExistsError'){
            req.flash(
                'registerMessage',
                'Registration Error: User Already Exists!'
            );
            console.log('Error: User Already Exists!');
        }
        return res.render('auth/register',
        {
            title:"Register",
            messages: req.flash('registerMessage'),
            displayName:req.user ? req.user.displayName:''
        });
    }
    else
    {
        //if registration success
        return passport.authenticate('local')(req,res,()=>{
            res.redirect('/surveys')
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
