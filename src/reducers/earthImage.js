import {nasaRequest} from "../ajax/serverRequests";

const SET_EARTH_IMAGE = `SET_EARTH_IMAGE`


const initialState = {
    earthImage: undefined
}


const earthImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EARTH_IMAGE:
            return {
                ...state,
                earthImage: action.earthImage
            }
        default:
            return state
    }
}


export default earthImageReducer


//AC
const setEarthImage = (earthImage) =>
    ( { type: SET_EARTH_IMAGE, earthImage } )


//THUNK
export const getEarthImage = async dispatch => {
    const response = await nasaRequest.getEarthImage()
    dispatch(setEarthImage(response.data))
}