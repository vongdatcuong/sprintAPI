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
    }
};
