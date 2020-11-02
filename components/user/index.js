var express = require('express');
var router = express.Router();
const UserController = require('./userController');
const passport = require('./passport.js');

/* POST Log In. */
router.post('/logIn', UserController.logIn);

/* POST Sign Up. */
router.post('/signUp', UserController.signUp);

/* POST Update profile. */
router.post('/updateProfile', passport.authenticate('jwt', { session: false }), UserController.updateProfile);

module.exports = router;