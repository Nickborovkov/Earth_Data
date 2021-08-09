import {nasaRequest} from "../serverRequests/serverRequests";

const SET_MARS_ROVER_PHOTOS = `SET_MARS_ROVER_PHOTOS`
const SET_MARS_ROVER_PARAMS = `SET_MARS_ROVER_PARAMS`


const initialState = {
    marsRoverPhotos: [],
    //setting curiosity as default rover
    rover: `curiosity`,
    //setting date of curiosity landing as a default date
    date: `2012-08-06`,
}


const marsRoverReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MARS_ROVER_PHOTOS:
            return {
                ...state,
                marsRoverPhotos: action.marsRoverPhotos
            }
        case SET_MARS_ROVER_PARAMS:
            return {
                ...state,
                rover: action.rover,
                date: action.date,
            }
        default:
            return state
    }
}


export default marsRoverReducer


//AC
const setMarsRoverPhotos = (marsRoverPhotos) =>
    ( { type: SET_MARS_ROVER_PHOTOS,  marsRoverPhotos} )
export const setMarsRoverParams = (rover, date) =>
    ( { type: SET_MARS_ROVER_PARAMS,  rover, date} )


//THUNK
export const getMarsRoverPhotos = (rover, date) => async dispatch => {
    const response = await nasaRequest.getMarsRoverPhotos(rover, date)
    dispatch(setMarsRoverPhotos(response.data.photos))
}