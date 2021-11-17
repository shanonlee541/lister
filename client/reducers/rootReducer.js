// In units, this is called index.js in the reducers folder
import { combineReducers } from "redux";
import userReducer from "./userReducer";

// Create rootReducer that combines all reducers
const rootReducer = combineReducers({
    user: userReducer
});

export default rootReducer;