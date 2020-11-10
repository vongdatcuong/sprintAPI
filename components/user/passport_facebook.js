const mongoose = require("mongoose");
const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const User = mongoose.model('User');
const UserModel = require('./userModel');

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
      callbackURL: "/user/auth/facebook/redirect",
      profileFields: ['id', 'emails', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //check if user already exists in our db with the given profile ID
        User.findOne({facebookID: profile.id}).then(async (currentUser)=>{
            if(currentUser){
              //if we already have a record with the given profile ID
              done(null, currentUser);
            } else{
                 //if not, create a new user 
                const newUser = await UserModel.addFacebookUser({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    facebookID: profile.id
                })
                done(null, newUser);
             } 
          })
    })
);

module.exports = passport;