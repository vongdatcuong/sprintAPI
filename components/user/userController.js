const User = require('./userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constant = require('../../Utils/constant');

/* POST LogIn. */
const logIn = async (req, res, next) => {
    const { username, password } = req.body;
    if (username && password){
        const user = await User.getUserByUsername(username);
        if (user){
            bcrypt.compare(password, user.password, (err, result) => {
                if (result === true) {
                    var payload = { userID: user.userID };
                    var token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
                    res.json({
                        isSuccess: true,
                        user: {
                            userID: user.userID,
                            username: user.username,
                            name: user.name,
                            email: user.email,
                            gender: user.gender,
                            createdDate: user.createdDate,
                            token: token
                        }
                    })
                } else {
                    res.json({
                        isSuccess: false,
                        message: constant.logInInvalid
                    })
                }
            })
            
        } else {
            res.json({
                isSuccess: false,
                message: constant.logInInvalid
            })
        }
    } else {
        res.json({
            isSuccess: false,
            message: constant.logInInvalid
        });
    }
};

/* POST Sign up */
const signUp = async(req, res, next) => {
    try {
        let username = await User.getUserByUsername(req.body.username);
        if (username) {
            res.json({
                isSuccess: false,
                message: constant.usernameExisted
            })
        } else {
            const result = await User.addUser({
                username: req.body.username.trim(),
                password: req.body.password.trim(),
                email: req.body.email.trim(),
                name: req.body.name.trim(),
            });

            if (result){
                res.json({
                    isSuccess: true,
                    message: constant.signUpSuccess,
                    user: result
                })
            } else {
                res.json({
                    isSuccess: false,
                    message: constant.signUpFail
                })
            }
        }
    } catch (error) {
        res.json({
            isSuccess: false,
            message: constant.signUpFail
        })
    }
};

/* POST Update profile */
const updateProfile = async(req, res, next) => {
    try { 
        if (!req.user.userID) {
            res.json({
                isSuccess: false,
                message: constant.updateProfileFail
            })
        } else {
            const updatedUser = await User.updateUser(req.user.userID, {
                name: req.body.name.trim(),
                email: req.body.email.trim(),
                gender: req.body.gender.trim(),
            });
            if (updatedUser){
                res.json({
                   isSuccess: true,
                   message: constant.updateProfileSuccess
                })
            } else {
                res.json({
                    isSuccess: false,
                    message: constant.updateProfileFail
                })
            }
        }
    } catch (error) {
        res.json({
            isSuccess: false,
            message: constant.updateProfileFail
        })
    }
};

/* GET Log in With Google */
const redirectGoogleID = (req, res, next) => {
    res.redirect(constant.clientDomain + constant.redirectPath + "/google/" + req.user.googleID);
}

const logInWithGoogle = async(req, res, next) => {
    if (req.body.googleID) {
        const user = await User.getUser({
            googleID: req.body.googleID
        });
        if (user){
            var payload = { userID: user.userID };
            var token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            res.json({
                isSuccess: true,
                user: {
                    userID: user.userID,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    gender: user.gender,
                    createdDate: user.createdDate,
                    token: token
                }
            })
        } else {
            res.json({
                isSuccess: false,
                message: constant.logInInvalid
            })
        }
    } else {
        res.json({
            isSuccess: false,
            message: constant.logInInvalid
        })
    }
};

/* GET Log in With Google */
const redirectFacebookID = (req, res, next) => {
    res.redirect(constant.clientDomain + constant.redirectPath + "/facebook/" + req.user.facebookID);
}

const logInWithFacebook = async(req, res, next) => {
    if (req.body.facebookID) {
        const user = await User.getUser({
            facebookID: req.body.facebookID
        });
        if (user){
            var payload = { userID: user.userID };
            var token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
            res.json({
                isSuccess: true,
                user: {
                    userID: user.userID,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    gender: user.gender,
                    createdDate: user.createdDate,
                    token: token
                }
            })
        } else {
            res.json({
                isSuccess: false,
                message: constant.logInInvalid
            })
        }
    } else {
        res.json({
            isSuccess: false,
            message: constant.logInInvalid
        })
    }
};

module.exports = {
    logIn,
    signUp,
    updateProfile,
    redirectGoogleID,
    logInWithGoogle,
    redirectFacebookID,
    logInWithFacebook
};
