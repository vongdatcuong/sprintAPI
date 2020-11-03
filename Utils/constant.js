const defaultColNum = 3;
const SALT_ROUNDS = 7;

// Messages
const logInInvalid = "Username or Password invalid!!!";
const usernameExisted = "Username has already existed";
const signUpSuccess = "Register successfully !!!";
const signUpFail = "Register fail !!!";
const createBoardFail = "Create Board fail !!!";
const deleteBoardFail = "Delete Board fail !!!";
const updateProfileSuccess = "Update Profile success !!!";
const updateProfileFail = "Update Profile fail !!!";
const updateBoardNameSuccess = "Update Board name success !!!";
const updateBoardNameFail = "Update Board name fail !!!";
const deleteCardFail = "Delete Card fail !!!";
const addCardFail = "Delete Card fail !!!";

module.exports = {
    defaultColNum,
    SALT_ROUNDS,
    // Messages
    logInInvalid,
    usernameExisted,
    signUpSuccess,
    signUpFail,
    createBoardFail,
    deleteBoardFail,
    updateProfileSuccess,
    updateProfileFail,
    updateBoardNameSuccess,
    updateBoardNameFail,
    deleteCardFail,
    addCardFail
}