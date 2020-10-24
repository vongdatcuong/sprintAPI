const mongoose = require('mongoose');
const constant = require('../../Utils/constant');
const Board = mongoose.model('Board');

module.exports = {
    getAllBoards(){
        return Board.find()
            .exec();
    }
};
