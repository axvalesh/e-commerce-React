import { applyMiddleware, combineReducers, createStore } from "redux";
import { usersReducer } from "./usersReducer.js";
import { productsReducer } from "./productsReducer.js";
import thunk from "redux-thunk";


const reducers = combineReducers({
    users: usersReducer,
    products: productsReducer,
})


export const store = createStore(reducers, applyMiddleware(thunk))