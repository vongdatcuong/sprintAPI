var express = require('express');
var router = express.Router();
const Board = require('./boardModel');

/* GET all Boards. */
router.get('/', async (req, res, next) => {
    const boards = await Board.getAllBoards();
    res.json(boards);
});

module.exports = router;
