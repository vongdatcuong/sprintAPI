const mongoose = require('mongoose');
const constant = require('../../Utils/constant');
const Column = mongoose.model('Column');

module.exports = {
    createDefaultColumns(boardID){
        const promises = []
        for (let i = 1; i <= 3; i++){
            promises.push(new Column({
                boardID: boardID,
                columnTypeID: i,
                numOfCard: 0,
                createdDate: new Date(),
                isActive: true
            }).save())
        }
        return Promise.all(promises);
    }
};
