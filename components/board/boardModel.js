const mongoose = require('mongoose');
const constant = require('../../Utils/constant');
const Board = mongoose.model('Board');

module.exports = {
    getAllBoards(query, option){
        query = query || {};
        query.isActive = query.isActive || true;

        option = option || {};
        const promise = Board.find(query)
        if (option.sort){
            promise.sort(option.sort)
        }
        promise.populate({
                path: 'columns',
                populate: {
                    path: 'cardNumber',
                    match: {isActive: true}
                }
            })
        return promise.exec();
    },
    getBoard(query, option){
        query = query || {};
        query.isActive = query.isActive || true;
        option = option || {};
        return Board.findOne(query)
            .populate({
                path: 'columns',
                options: {sort: {order: 1}},
                populate: [{ path: 'cards', match: {isActive: true}, options: {sort: {createdDate: 1} }}, { path: 'columnType' }]
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
    updateBoard(boardID, newInfo){
        return Board.findOneAndUpdate({ boardID: boardID}, newInfo).exec();
    },
    deleteBoard(boardID, userID){
        return Board.findOneAndUpdate({ boardID: boardID, userID: userID }, {
            isActive: false
        }).exec();
    }
};
