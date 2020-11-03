const Board = require('./boardModel');
const Column = require('../column/columnModel');
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
        let boards = await Board.getAllBoards({userID: parseInt(req.user.userID)}, {sort: {createdDate: 1}});
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
    const userIDStr = req.query.userID || req.user.userID;
    if (!userIDStr || !req.query.boardID){
        res.json({
            isSuccess: false
        })
    } else {
        const board = await Board.getBoard({userID: parseInt(userIDStr), boardID: parseInt(req.query.boardID)});
        if (board){
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
                        columnID: col.columnID,
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
        } else {
            res.json({
                isSuccess: false
            })
        }
        
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
                try {
                    await Column.createDefaultColumns(newBoard.boardID);
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
                } catch {
                    res.json({
                        isSuccess: false,
                        message: constant.createBoardFail
                    })
                }
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

/* POST Change Board name. */
const updateName = async (req, res, next) => {
    const userIDStr = req.body.userID || req.user.userID;
    try {
        if (!userIDStr || !req.body.boardID || !req.body.name) {
            res.json({
                isSuccess: false,
                message: constant.updateBoardNameFail
            })
        } else {
            const updatedBoard = await Board.updateBoard(parseInt(req.body.boardID), parseInt(userIDStr), {
                name: req.body.name.trim()
            });
            if (updatedBoard){
                res.json({
                   isSuccess: true,
                   message: constant.updateBoardNameSuccess
                })
            } else {
                res.json({
                    isSuccess: false,
                    message: constant.updateBoardNameFail
                })
            }
        }
    } catch (error) {
        res.json({
            isSuccess: false,
            message: constant.updateBoardNameFail
        })
    }
}

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
    updateName,
    deleteBoard
};
