import {nasaRequest} from "../ajax/serverRequests";

const SET_EARTH_OBSERVATION = `SET_EARTH_OBSERVATION`


const initialState = {
    earthObservation: undefined
}


const earthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EARTH_OBSERVATION:
            return {
                ...state,
                earthObservation: action.earthObservation
            }
        default:
            return state
    }
}


export default earthReducer


//AC
const setEarthObservation = (earthObservation) =>
    ( { type: SET_EARTH_OBSERVATION,  earthObservation} )


//THUNK

export const getEarthObservation = async dispatch => {
    const response = await nasaRequest.getEarthObservation()
    dispatch(setEarthObservation(response.data))
}