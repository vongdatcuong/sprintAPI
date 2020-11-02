var express = require('express');
var router = express.Router();
const BoardController = require('./boardController');
const passport = require('../user/passport');

/* GET all Boards. */
router.get('/', passport.authenticate('jwt', { session: false }), BoardController.boards);

/* GET Boards of User. */
router.get('/myBoard', passport.authenticate('jwt', { session: false }), BoardController.myBoard);

/* GET Detail Boards of User. */
router.get('/board', passport.authenticate('jwt', { session: false }), BoardController.board);

/* POST Add new board */
router.post('/add', passport.authenticate('jwt', { session: false }), BoardController.addBoard);

/* POST Change board name */
router.post('/updateName', passport.authenticate('jwt', { session: false }), BoardController.updateName);

/* POST Delete board */
router.post('/delete', passport.authenticate('jwt', { session: false }), BoardController.deleteBoard);

module.exports = router;
