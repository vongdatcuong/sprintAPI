var express = require('express');
var router = express.Router();
const BoardController = require('./boardController');
const passport = require('../user/passport');

/* GET all Boards. */
router.get('/', passport.authenticate('jwt', { session: false }), BoardController.boards);

/* GET Boards of User. */
router.get('/myBoard', passport.authenticate('jwt', { session: false }), BoardController.myBoard);

/* POST Add new board */
router.post('/addBoard', passport.authenticate('jwt', { session: false }), BoardController.addBoard);

module.exports = router;
