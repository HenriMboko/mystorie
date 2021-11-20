const express = require('express');
const route = express.Router();
const passport = require('passport');


//route get login
//@Route /Get

route.get('/google',passport.authenticate('google',{scope : ['profile']}));

//route get/dashboard
//@Route/Get/dashboard

route.get(
    '/google/callback',
    passport.authenticate('google',{failureRedirect : '/'}),
    (req,res, next)=>{
    res.redirect('/dashboard')
})

//route get /logout
//@route /auth/logout

route.get('/logout',(req,res,next)=>{
    req.logout();
    res.redirect('/');
})

 

module.exports = route;

