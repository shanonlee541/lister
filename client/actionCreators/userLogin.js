// Action creator that will be invoked by redux-thunk middleware, because returns a function, not
// an object like a typical action
// We'll dispatch this function in our component to trigger fetch requests before 
// action hits the reducer 

import { userLoginRequest, userLoginSuccess } from "./userActionCreators"

function userLogin(username, password) {
    return function (dispatch) {
        // Dispatch loading state for user login
        dispatch(userLoginRequest());
        // Options for POST request
        const optionsObject = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                username, 
                password
            })
        }
        // Make POST request to /users/login
        fetch('/user/login', optionsObject)
            .then(data => data.json())
            .then(data => {
                // If error in response (fetch can be weird with throwing errors)
                if (data.error) {
                    dispatch(userLoginFail(data.error));
                    throw data.error;
                }
                // When get parsed data back, dispatch successful action
                dispatch(userLoginSuccess(data.user_id));
            })
            .catch(err => {
                dispatch(userLoginFail(err));
            })
    }
}

export default userLogin;