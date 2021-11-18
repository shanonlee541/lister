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
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                name, 
                username, 
                password
            })
        }

        

        // Make POST request to backend to send back newly created user 
        fetch('/user/signup', optionsObject)
            .then(data => data.json())
            .then(data => {
                // Send back user_id from backend { user_id: X }
                console.log(data.user_id)
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