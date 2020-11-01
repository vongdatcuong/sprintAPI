const defaultColNum = 3;
const SALT_ROUNDS = 7;

// Messages
const logInInvalid = "Username hoặc Password không hợp lệ !!!";
const usernameExisted = "Username đã tồn tại";
const signUpSuccess = "Đăng ký thành công !!!";
const signUpFail = "Đăng ký thất bại !!!";

module.exports = {
    defaultColNum,
    SALT_ROUNDS,
    // Messages
    logInInvalid,
    usernameExisted,
    signUpSuccess,
    signUpFail
}