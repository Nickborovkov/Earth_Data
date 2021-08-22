import {nasaRequest} from "../serverRequests/serverRequests";
import {setNewError, toggleIsFetching} from "./common";

const SET_EARTH_IMAGE = `NASA/earthImage/SET_EARTH_IMAGE`
const SET_EARTH_IMAGE_DATE = `NASA/earthImage/SET_EARTH_IMAGE_DATE`


const initialState = {
    earthImage: [],
    //setting date when this api started, because today's date is not always available
    date: `2015-06-13`,
}


const earthEpicReducer = (state = initialState, action) => {
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


export default earthEpicReducer


//AC
const setEarthImage = (earthImage) =>
    ( { type: SET_EARTH_IMAGE, earthImage } )
export const setEarthImageDate = (date) =>
    ( { type: SET_EARTH_IMAGE_DATE, date } )


//THUNK
export const getEarthImage = (date) => async dispatch => {
    try {
        dispatch(toggleIsFetching(true))
        const response = await nasaRequest.getEarthImage(date)
        if(response.data.length !== 0){
            dispatch(setEarthImage(response.data))
            dispatch(toggleIsFetching(false))
        }else {
            dispatch(setNewError(`No images for this date`))
        }
    }catch (error) {
        dispatch(setNewError(error))
    }

}