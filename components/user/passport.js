const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;
opts.passReqToCallback= true;

passport.use(new JwtStrategy(opts, function(req, jwt_payload, done) {
    User.findOne({userID: jwt_payload.userID}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;