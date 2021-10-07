import {nasaRequest} from "../API/serverRequests";
import {setNewError, toggleIsFetching} from "./commonReducer";
import imagePreloader from "../components/common/preloaders/imageLoader.gif"


const SET_EARTH_OBSERVATION = `NASA/earth/SET_EARTH_OBSERVATION`
const SET_PARAMETERS = `NASA/earth/SET_PARAMETERS`


const initialState = {
    earthObservation: {
        url: imagePreloader,
    },
    longitude: 20,
    latitude: 40,
}


const earthObsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EARTH_OBSERVATION:
            return {
                ...state,
                earthObservation: action.earthObservation
            }
        case SET_PARAMETERS:
            return {
                ...state,
                longitude: action.lon,
                latitude: action.lat,
            }
        default:
            return state
    }
}


export default earthObsReducer


//AC
const setEarthObservation = (earthObservation) =>
    ( { type: SET_EARTH_OBSERVATION,  earthObservation} )
export const setParameters = (lon, lat) =>
    ( { type: SET_PARAMETERS,  lon, lat} )


//THUNK
export const getEarthObservation = (lon, lat) => async dispatch => {
    try {
        dispatch(toggleIsFetching(true))
        const response = await nasaRequest.getEarthObservation(lon, lat)
        dispatch(setEarthObservation(response.data))
        dispatch(toggleIsFetching(false))
    }catch (error) {
        dispatch(setNewError(error))
    }
}
