const mongoose = require('mongoose');
const constant = require('../../Utils/constant');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');

module.exports = {
    getUserByUsername(username){
        return User.findOne({username: username}).exec();
    },
    getUser(query){
        return User.findOne(query).exec();
    },
    addUser(info) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(info.password, constant.SALT_ROUNDS, (err, hash) => {
                const newUser = new User({
                    username: info.username,
                    email: info.email,
                    name: info.name,
                    password: hash,
                    createdDate: new Date()
                });
                try {
                    newUser.save(function(err) {
                        if (err) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                } catch (err) {
                    console.log('error at signUp' + err);
                }
            })
        })
    },
    addGoogleUser(info) {
        const newUser = new User({
            email: info.email,
            name: info.name,
            createdDate: new Date(),
            googleID: info.googleID,
        });
        try {
            return newUser.save();
        } catch (err) {
            console.log('error at signUp' + err);
        }
    },
    updateUser(userID, info){
        info = info || {};
        return User.findOneAndUpdate({userID: userID }, {
            name: info.name || "",
            email: info.email || "",
            gender: info.gender || ""
        }).exec();
    }
};
