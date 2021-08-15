import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import apodReducer from "./apod";
import neowsReducer from "./neows";
import earthReducer from "./earth";
import earthImageReducer from "./earthImage";
import marsRoverReducer from "./marsRover";
import nasaLibraryReducer from "./nasaLibrary";
import errorsReducer from "./errors";

const reducers = combineReducers({
    apod: apodReducer,
    neows: neowsReducer,
    earth: earthReducer,
    earthImage: earthImageReducer,
    marsRover: marsRoverReducer,
    library: nasaLibraryReducer,
    errors: errorsReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store

window.store = store