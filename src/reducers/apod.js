import {nasaRequest} from "../ajax/serverRequests";

const SET_APOD = `SET_APOD`


const initialState = {
    apodArray: []
}


const apodReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APOD:
            return {
                ...state,
                apodArray: [action.apodArray]
            }
        default:
            return state
    }
}


export default apodReducer


//AC
const setApod = (apodArray) =>
    ( {type: SET_APOD, apodArray} )


//THUNK
export const getApod = async dispatch => {
    const response = await nasaRequest.getAPOD()
    dispatch(setApod(response.data))
}