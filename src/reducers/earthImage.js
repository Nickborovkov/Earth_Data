import {nasaRequest} from "../serverRequests/serverRequests";

const SET_EARTH_IMAGE = `NASA/earthImage/SET_EARTH_IMAGE`
const SET_EARTH_IMAGE_DATE = `NASA/earthImage/SET_EARTH_IMAGE_DATE`


const initialState = {
    earthImage: undefined,
    //setting date when this date started to be collected, because today's date is not always available
    date: `2015-06-13`,
}


const earthImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EARTH_IMAGE:
            return {
                ...state,
                earthImage: action.earthImage
            }
        case SET_EARTH_IMAGE_DATE:
            return {
                ...state,
                date: action.date
            }
        default:
            return state
    }
}


export default earthImageReducer


//AC
const setEarthImage = (earthImage) =>
    ( { type: SET_EARTH_IMAGE, earthImage } )
export const setEarthImageDate = (date) =>
    ( { type: SET_EARTH_IMAGE_DATE, date } )


//THUNK
export const getEarthImage = (date) => async dispatch => {
    const response = await nasaRequest.getEarthImage(date)
    dispatch(setEarthImage(response.data))
}