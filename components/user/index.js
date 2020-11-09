var express = require('express');
var router = express.Router();
const UserController = require('./userController');
const passport = require('./passport.js');
const passportGoogle = require('./passport_google.js');

/* POST Log In. */
router.post('/logIn', UserController.logIn);

/* GET Log In With Google. */
router.get('/auth/google', passportGoogle.authenticate("google", {
    scope: ["profile", "email"],
    session: false
}));
router.get("/auth/google/redirect", passportGoogle.authenticate('google', { session: false }), UserController.redirectGoogleID);
/* POST Log In With Google. */
router.post('/logInWithGoogle', UserController.logInWithGoogle);


/* POST Sign Up. */
router.post('/signUp', UserController.signUp);

/* POST Update profile. */
router.post('/updateProfile', passport.authenticate('jwt', { session: false }), UserController.updateProfile);

module.exports = router;