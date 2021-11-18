import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL } from "../constants/userConstants";

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

// User sign up request 
function userSignupRequest () {
    return {
        type: USER_SIGNUP_REQUEST
    }
}

// User sign up success
function userSignupSuccess (user_id) {
    return {
        type: USER_SIGNUP_SUCCESS, 
        payload: user_id
    }
}

// User sign up fail 
function userSignupFail (error) {
    return {
        type: USER_SIGNUP_FAIL, 
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

export { 
    userLoginRequest, 
    userLoginSuccess, 
    userLoginFail, 
    userLogoutActionCreator, 
    userSignupRequest, 
    userSignupSuccess, 
    userSignupFail,
    testActionCreator };