import {nasaRequest} from "../serverRequests/serverRequests";

const SET_MARS_ROVER_PHOTOS = `nasa/marsRover/SET_MARS_ROVER_PHOTOS`
const SET_MARS_ROVER_PARAMS = `nasa/marsRover/SET_MARS_ROVER_PARAMS`
const NEXT_PAGE = `nasa/marsRover/NEXT_PAGE`
const PREV_PAGE = `nasa/marsRover/NEXT_PAGE`
const SET_EMPTY_PHOTOS = `nasa/marsRover/SET_EMPTY_PHOTOS`


const initialState = {
    marsRoverPhotos: [],
    //setting curiosity as default rover
    rover: `curiosity`,
    //setting date of curiosity landing as a default date
    date: `2012-08-06`,
    page: 1,
    emptyPhotos: false,
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
        case NEXT_PAGE:
            return {
                ...state,
                page: state.page + 1,
            }
        case PREV_PAGE:
            return {
                ...state,
                page: state.page - 1,
            }
        case SET_EMPTY_PHOTOS:
            return {
                ...state,
                emptyPhotos: action.emptyPhotos,
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

export const roverNextPage = () =>
    ( { type: NEXT_PAGE} )

export const roverPrevPage = () =>
    ( { type: PREV_PAGE} )

export const setEmptyPhotos = (emptyPhotos) =>
    ( { type: SET_EMPTY_PHOTOS, emptyPhotos} )


//THUNK
export const getMarsRoverPhotos = (rover, date, page) => async dispatch => {
    try {
        const response = await nasaRequest.getMarsRoverPhotos(rover, date, page)
        dispatch(setEmptyPhotos(false))
        if(response.data.photos.length > 0){
            dispatch(setMarsRoverPhotos(response.data.photos))
        }else {
            dispatch(setEmptyPhotos(true))
        }
    }catch (err) {
        alert(err)
    }

}