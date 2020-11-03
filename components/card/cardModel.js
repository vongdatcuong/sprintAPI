const mongoose = require('mongoose');
const constant = require('../../Utils/constant');
const Card = mongoose.model('Card');

module.exports = {
    deleteCard(cardID){
        return Card.findOneAndUpdate({ cardID: cardID }, {
            isActive: false
        }).exec();
    },
    addCard(userID, columnID, info){
        info = info || {};
        info.content = info.content || "";
        const newCard = new Card({
            columnID: columnID,
            content: info.content,
            userID: userID,
            createdDate: new Date(),
            isActive: true
        });
        try {
            return newCard.save();
        } catch (err) {
            console.log('error at add new card' + err);
        }
    },
    updateCard(cardID, newInfo){
        return Card.findOneAndUpdate({ cardID: cardID}, newInfo).exec();
    },
};
