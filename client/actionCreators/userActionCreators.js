import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from "../constants/userConstants";

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

// User logout
function userLogoutActionCreator() {
    return {
        type: USER_LOGOUT
    }
}

// Test Action Creator
function testActionCreator() {
    return {
        type: 'TEST', 
        payload: 'This is my test payload.'
    }
}

export { userLoginRequest, userLoginSuccess, userLoginFail, userLogoutActionCreator, testActionCreator };