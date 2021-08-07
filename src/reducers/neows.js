import {nasaRequest} from "../ajax/serverRequests";

const SET_NEOWS = `SET_NEOWS`


const initialState = {
    neowsArray: []
}


const neowsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEOWS:
            return {
                ...state,
                neowsArray: Object.values(action.neowsArray)[0]
            }
        default:
            return state
    }
}


export default neowsReducer


//AC
const setNeows = (neowsArray) =>
    ( { type: SET_NEOWS, neowsArray } )


//THINK

const neowsDate = `2021-08-07`

export const getNeows = async dispatch => {
    const response = await nasaRequest.getNeows(neowsDate)
    dispatch(setNeows(response.data.near_earth_objects))
}