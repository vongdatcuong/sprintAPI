var express = require('express');
var router = express.Router();
const CardController = require('./cardController');
const passport = require('../user/passport');


/* POST Delete card */
router.post('/delete', passport.authenticate('jwt', { session: false }), CardController.deleteCard);

module.exports = router;
