import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import mainReducer from "./reducer";

const reducers = combineReducers({
    main: mainReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store

window.store = store