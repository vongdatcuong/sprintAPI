const mongoose = require('mongoose');
const constant = require('../../Utils/constant');
const User = mongoose.model('User');

module.exports = {
    getUserByUsername(username){
        return User.findOne({username: username}).exec();
    }
};
