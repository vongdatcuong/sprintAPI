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

/* POST Add New Board. */
const addCard = async (req, res, next) => {
    try {
        const userIDStr = req.body.userID || req.user.userID;
        if (!userIDStr || !req.body.columnID) {
            res.json({
                isSuccess: false,
                message: constant.addCardFail
            })
        } else {
            const columnID = parseInt(req.body.columnID);
            const newCard = await Card.addCard(parseInt(userIDStr), columnID, {
                content: req.body.content.trim(),
            });

            if (newCard){
                try {
                    const updatedCol = await Column.updateColumn(columnID, {
                        $inc: {numOfCard: 1}
                    })
                    if (updatedCol){
                        res.json({
                            isSuccess: true,
                            card: {
                                cardID: newCard.cardID,
                                columnID: columnID,
                                content: newCard.content,
                                createdDate: newCard.createdDate,
                             }
                        })
                    } else{
                        res.json({
                            isSuccess: false,
                            message: constant.addCardFail
                        })
                    }
                } catch (error){
                    res.json({
                        isSuccess: false,
                        message: constant.addCardFail
                    })
                }
            } else {
                res.json({
                    isSuccess: false,
                    message: constant.addCardFail
                })
            }
        }
    } catch (error) {
        res.json({
            isSuccess: false,
            message: constant.addCardFail
        })
    }
};

/* POST Update Card. */
const updateCard = async (req, res, next) => {
    const userIDStr = req.body.userID || req.user.userID;
    try {
        if (!userIDStr || !req.body.cardID || !req.body.content) {
            res.json({
                isSuccess: false,
                message: constant.updateCardFail
            })
        } else {
            const updatedCard = await Card.updateCard(parseInt(req.body.cardID), {
                content: req.body.content.trim()
            });
            if (updatedCard){
                res.json({
                   isSuccess: true
                })
            } else {
                res.json({
                    isSuccess: false,
                    message: constant.updateCardFail
                })
            }
        }
    } catch (error) {
        res.json({
            isSuccess: false,
            message: constant.updateCardFail
        })
    }
}

module.exports = {
    deleteCard,
    addCard,
    updateCard
};
