const Board = require('./boardModel');

/* GET all Boards. */
const boards = async (req, res, next) => {
    let boards = await Board.getAllBoards();
    const result = boards.map((board, index) => {
        return {
            boardID: board.boardID,
            name: board.name,
            createdDate: board.createdDate,
            numOfCol: board.numOfCol,
            numOfCard: board.columns.reduce(((accum, col, index) => accum + col.cardNumber), 0)
        }
    })
    res.json(result);
};

module.exports = {
    boards
};
