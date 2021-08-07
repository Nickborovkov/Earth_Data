import {nasaRequest} from "../ajax/serverRequests";

const SET_MARS_ROVER_PHOTOS = `SET_MARS_ROVER_PHOTOS`


const initialState = {
    marsRoverPhotos: []
}


const marsRoverReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MARS_ROVER_PHOTOS:
            return {
                ...state,
                marsRoverPhotos: action.marsRoverPhotos
            }
        default:
            return state
    }
}


export default marsRoverReducer


//AC
const setMarsRoverPhotos = (marsRoverPhotos) =>
    ( { type: SET_MARS_ROVER_PHOTOS,  marsRoverPhotos} )


//THUNK
export const getMarsRoverPhotos = async dispatch => {
    const response = await nasaRequest.getMarsRoverPhotos()
    dispatch(setMarsRoverPhotos(response.data.photos))
}