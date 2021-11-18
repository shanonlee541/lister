import { userSignupRequest, userSignupSuccess, userSignupFail } from './userActionCreators.js';

// Thunk action creator: userSignup
function userSignup (name, username, password) {
    // Returns this anonymous thunk function 
    return function (dispatch, getState) {
        // Dispatch pending state 
        dispatch(userSignupRequest());

        const optionsObject = {
            method: 'POST', 
            headers: {
                'ContentType': 'application/json'
            }, 
            body: JSON.stringify({
                name, 
                username, 
                password
            })
        }

        // Make POST request to backend to send back newly created user 
        fetch('/users/signup', optionsObject)
            .then(data => {
                console.log('POST to /users/signup success!');
                // Dispatch success action 
                dispatch(userSignupSuccess(data.user_id));
            })
            .catch(err => {
                console.log('Error ' + err);
                // Dispatch fail action 
                dispatch(userSignupFail(err));
            });
    }
};

export default userSignup;