const express = require('express');
const route = express.Router();
const {ensureAuth,ensureGuest} = require('../middleware/authm');



//router get login


route.get('/',ensureGuest,(req,res,next)=>{
    res.render("login")
});


route.get('/dashboard',ensureAuth,(req,res, next)=>{
    res.render("dashboard");

})



 



module.exports = route;

