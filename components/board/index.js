var express = require('express');
var router = express.Router();
const BoardController = require('./boardController');
const passport = require('../user/passport');

/* GET all Boards. */
router.get('/', passport.authenticate('jwt', { session: false }), BoardController.boards);

module.exports = router;
