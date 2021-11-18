import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers/rootReducer.js";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(
    rootReducer, 
    // composeWithDevTools(applyMiddleware(thunk))
    composedEnhancer
)

export default store;