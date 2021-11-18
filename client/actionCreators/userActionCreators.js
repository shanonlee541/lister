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

// Test Action Creator
function testActionCreator() {
    return {
        type: 'TEST', 
        payload: 'This is my test payload.'
    }
}

export { userLoginRequest, userLoginSuccess, userLoginFail, testActionCreator };