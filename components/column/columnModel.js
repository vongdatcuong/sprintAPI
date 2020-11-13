const mongoose = require('mongoose');
const constant = require('../../Utils/constant');
const Column = mongoose.model('Column');

module.exports = {
    getAllColumns(query, option){
        query = query || {};
        query.isActive = query.isActive || true;

        option = option || {};
        const promise = Column.find(query)
        if (option.sort){
            promise.sort(option.sort)
        }
        return promise.exec();
    },
    createDefaultColumns(boardID){
        const promises = []
        for (let i = 1; i <= 3; i++){
            promises.push(new Column({
                boardID: boardID,
                columnTypeID: i,
                numOfCard: 0,
                order: i,
                createdDate: new Date(),
                isActive: true
            }).save())
        }
        return Promise.all(promises);
    },
    updateColumn(columnID, info){
        info = info || {};
        return Column.findOneAndUpdate({columnID: columnID }, info).exec();
    }
};
