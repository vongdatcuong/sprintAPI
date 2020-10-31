var express = require('express');
var router = express.Router();
const UserController = require('./userController');
const passport = require('./passport.js');

/* Log In. */
router.post('/logIn', UserController.logIn);

module.exports = router;