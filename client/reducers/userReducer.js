import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from "../constants/userConstants";

const initialState = {
    loading: false, 
    error: null,
    user_id: null
}

const userReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case (USER_LOGIN_REQUEST): {
            return {
                ...state, 
                loading: true
            }
        }

        case (USER_LOGIN_SUCCESS): {
            return {
                ...state, 
                loading: false, 
                user_id: action.payload
            }
        }

        case (USER_LOGIN_FAIL): {
            return {
                ...state, 
                loading: false, 
                error: action.payload,
            }
        }
        
        default: {
            return state;
        }
    }
};

export default userReducer;

