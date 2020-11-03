const mongoose = require('mongoose');
const constant = require('../../Utils/constant');
const Card = mongoose.model('Card');

module.exports = {
    deleteCard(cardID){
        return Card.findOneAndUpdate({ cardID: cardID }, {
            isActive: false
        }).exec();
    }
};
