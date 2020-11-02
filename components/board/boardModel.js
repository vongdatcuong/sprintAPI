const mongoose = require('mongoose');
const constant = require('../../Utils/constant');
const Board = mongoose.model('Board');

module.exports = {
    getAllBoards(option){
        option = option || {};
        option.isActive = option.isActive || true;
        return Board.find(option)
            .populate({
                path: 'columns',
                populate:' cardNumber'
            })
            .exec();
    },
    getBoard(userID, boardID, option){
        option = option || {};
        option.isActive = option.isActive || true;
        return Board.findOne(option)
            .populate({
                path: 'columns',
                populate: [{ path: 'cards', match: {isActive: true} }, { path: 'columnType' }]
            })
            .exec();
    },
    addBoard(userID, info){
        info = info || {};
        info.name = info.name || "";
        const newBoard = new Board({
            userID: userID,
            name: info.name,
            numOfCol: constant.defaultColNum,
            createdDate: new Date(),
            lastUpdate: null,
            isActive: true
        });
        try {
            return newBoard.save();
        } catch (err) {
            console.log('error at add new board' + err);
        }
    },
    deleteBoard(boardID, userID){
        return Board.findOneAndUpdate({ boardID: boardID, userID: userID }, {
            isActive: false
        }).exec();
    }
};
