const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = mongoose.model('User');
const UserModel = require('./userModel');
const constant = require('../../Utils/constant');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
      callbackURL: constant.serverDomain + "/user/auth/google/redirect"
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //check if user already exists in our db with the given profile ID
        User.findOne({googleID: profile.id}).then(async (currentUser)=>{
            if(currentUser){
              //if we already have a record with the given profile ID
              done(null, currentUser);
            } else{
                 //if not, create a new user 
                const newUser = await UserModel.addGoogleUser({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleID: profile.id
                })
                done(null, newUser);
             } 
          })
    })
);

module.exports = passport;