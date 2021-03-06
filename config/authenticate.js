
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const mongoose = require('mongoose');
const User = require('../models/user');
const config = require('./config');
const passport = require('passport');


/* module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID : config.GOOGLE_CLIENT_ID,
        clientSecret : config.GOOGLE_CLIENT_SECRET,
        callbackURL : '/auth/google/callback',
        passReqToCallback   : true
    },
    async(request, accessToken, refreshToken, profile, done)=>{
        console.log(profile);
    }
    
    ))
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=>{
          done(err, user);
        });
      });
} */

module.exports = () =>{
    passport.use(new GoogleStrategy({
        clientID : config.GOOGLE_CLIENT_ID,
        clientSecret : config.GOOGLE_CLIENT_SECRET,
        callbackURL : '/auth/google/callback',
        passReqToCallback   : true
    },
    async(request, accessToken, refreshToken, profile, done)=>{
        console.log(profile);
        const newUser = {
            googleId : profile.id,
            displayName : profile.name.givenName,
            firstName : profile.name.givenName,
            lastName : profile.name.familyName,
            image : profile.photos[0].value,

        }
        try {
            let user = await User.findOne({googleId : profile.id})

            if(user){
                done(null, user)
            }else{
                user = await User.create(newUser)
                done(null, user)
            }
        }catch (err){
            console.error(err);
        }
    }
    
    ))
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=>{
          done(err, user);
        });
      });
}