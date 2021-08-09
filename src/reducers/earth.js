import {nasaRequest} from "../serverRequests/serverRequests";
import {dateToday} from "../helpers/dateToday";

const SET_EARTH_OBSERVATION = `NASA/earth/SET_EARTH_OBSERVATION`
const SET_PARAMETERS = `NASA/earth/SET_PARAMETERS`


const initialState = {
    earthObservation: undefined,
    longitude: 34.537324,
    latitude: 28.572325,
    date: dateToday,
    dimensions: 0.5
}


const earthReducer = (state = initialState, action) => {
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
                date: action.date,
                dimensions: action.dim,
            }
        default:
            return state
    }
}


export default earthReducer


//AC
const setEarthObservation = (earthObservation) =>
    ( { type: SET_EARTH_OBSERVATION,  earthObservation} )
export const setParameters = (lon, lat, date, dim) =>
    ( { type: SET_PARAMETERS,  lon, lat, date, dim} )


//THUNK

export const getEarthObservation = (lon, lat, date, dim) => async dispatch => {
    const response = await nasaRequest.getEarthObservation(lon, lat, date, dim)
    dispatch(setEarthObservation(response.data))
}