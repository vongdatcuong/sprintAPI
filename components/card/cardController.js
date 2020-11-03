const Card = require('./cardModel.js');
const Column = require('../column/columnModel.js');
const constant = require('../../Utils/constant.js');


/* POST Delete Board. */
const deleteCard = async (req, res, next) => {
    try {
        if (!req.user.userID || !req.body.cardID) {
            res.json({
                isSuccess: false,
                message: constant.deleteCardFail
            })
        } else {
            const deletedCard = await Card.deleteCard(parseInt(req.body.cardID));
            if (deletedCard){
                const updatedCol = await Column.updateColumn(deletedCard.columnID, {
                    $inc: {numOfCard: -1}
                })
                if (updatedCol){
                    res.json({
                        isSuccess: true
                     })
                } else {
                    res.json({
                        isSuccess: false,
                        message: constant.deleteCardFail
                    })
                }
                
            } else {
                res.json({
                    isSuccess: false,
                    message: constant.deleteCardFail
                })
            }
        }
    } catch (error) {
        res.json({
            isSuccess: false,
            message: constant.deleteCardFail
        })
    }
};

module.exports = {
    deleteCard
};
