import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import apodReducer from "./apodReducer";
import neowsReducer from "./neowsReducer";
import earthObsReducer from "./earthObsReducer";
import earthEpicReducer from "./earthEpicReducer";
import marsRoverReducer from "./marsRoverReducer";
import nasaLibraryReducer from "./nasaLibraryReducer";
import commonReducer from "./commonReducer";


const reducers = combineReducers({
    apod: apodReducer,
    neows: neowsReducer,
    earth: earthObsReducer,
    earthImage: earthEpicReducer,
    marsRover: marsRoverReducer,
    library: nasaLibraryReducer,
    common: commonReducer,
})

const store = createStore(reducers, applyMiddleware(thunk))

export default store
