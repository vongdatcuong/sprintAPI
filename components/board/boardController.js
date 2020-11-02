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
    if (!req.user){
        res.json({
            isSuccess: false
        })
    } else {
        let boards = await Board.getAllBoards({userID: parseInt(req.user.userID)});
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
    }
};

/* GET Detail Boards of User. */
const board = async (req, res, next) => {
    if (!req.user || !req.query.boardID){
        res.json({
            isSuccess: false
        })
    } else {
        const board = await Board.getBoard({userID: parseInt(req.user.userID), boardID: parseInt(req.query.boardID)});
        const returnBoard = {
            boardID: board.boardID,
            name: board.name,
            createdDate: board.createdDate,
            numOfCol: board.numOfCol,
        };
         returnBoard.columns = board.columns.map((col, index) => {
            const newCol = {
                columnID: col.columnID,
                columnName: col.columnType.name,
                numOfCard: col.numOfCard,
                createdDate: col.createdDate
            }
            newCol.cards = col.cards.map((card, index) => {
                return {
                    cardID: card.cardID,
                    content: card.content,
                    createdDate: card.createdDate,
                }
            })
            return newCol;
        })
        res.json({
            isSuccess: true,
            board: returnBoard
        });
    }
};

/* POST Add New Board. */
const addBoard = async (req, res, next) => {
    try {
        if (!req.user.userID) {
            res.json({
                isSuccess: false,
                message: constant.createBoardFail
            })
        } else {
            const newBoard = await Board.addBoard(parseInt(req.user.userID), {
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

/* POST Delete Board. */
const deleteBoard = async (req, res, next) => {
    try {
        if (!req.user.userID || !req.body.boardID) {
            res.json({
                isSuccess: false,
                message: constant.deleteBoardFail
            })
        } else {
            const deletedBoard = await Board.deleteBoard(parseInt(req.body.boardID), parseInt(req.user.userID));
            if (deletedBoard){
                res.json({
                   isSuccess: true
                })
            } else {
                res.json({
                    isSuccess: false,
                    message: constant.deleteBoardFail
                })
            }
        }
    } catch (error) {
        res.json({
            isSuccess: false,
            message: constant.deleteBoardFail
        })
    }
};

module.exports = {
    boards,
    myBoard,
    board,
    addBoard,
    deleteBoard
};
