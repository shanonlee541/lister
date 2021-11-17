import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from "../constants/userConstants";

// User login request 
function userLoginRequest() {
    return {
        type: USER_LOGIN_REQUEST
    };
};

// User login success 
function userLoginSuccess(userInfo) {
    return {
        type: USER_LOGIN_SUCCESS, 
        payload: userInfo
    }
}

// User login fail
function userLoginFail(error) {
    return {
        type: USER_LOGIN_FAIL, 
        payload: error
    }
}

export { userLoginRequest, userLoginSuccess, userLoginFail };