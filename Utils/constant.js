const defaultColNum = 3;
const SALT_ROUNDS = 7;

// Messages
const logInInvalid = "Username or Password invalid!!!";
const usernameExisted = "Username has already existed";
const signUpSuccess = "Register successfully !!!";
const signUpFail = "Register fail !!!";
const createBoardFail = "Create Board fail !!!";

module.exports = {
    defaultColNum,
    SALT_ROUNDS,
    // Messages
    logInInvalid,
    usernameExisted,
    signUpSuccess,
    signUpFail,
    createBoardFail
}