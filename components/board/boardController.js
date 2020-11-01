const Board = require('./boardModel');
const constant = require('../../Utils/constant.js');

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

/* GET Boards of User. */
const myBoard = async (req, res, next) => {
    let boards = await Board.getAllBoards({userID: parseInt(req.query.userID)});
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

/* POST Add New Board. */
const addBoard = async (req, res, next) => {
    try {
        if (!req.body.userID) {
            res.json({
                isSuccess: false,
                message: constant.createBoardFail
            })
        } else {
            const newBoard = await Board.addBoard(parseInt(req.body.userID), {
                name: req.body.name.trim(),
            });

            if (newBoard){
                res.json({
                   isSuccess: true,
                   board: {
                        boardID: newBoard.boardID,
                        name: newBoard.name,
                        createdDate: new Date(newBoard.createdDate),
                        numOfCol: newBoard.numOfCol,
                        numOfCard: 0
                    }
                })
            } else {
                res.json({
                    isSuccess: false,
                    message: constant.createBoardFail
                })
            }
        }
    } catch (error) {
        res.json({
            isSuccess: false,
            message: constant.createBoardFail
        })
    }
};

module.exports = {
    boards,
    myBoard,
    addBoard
};
