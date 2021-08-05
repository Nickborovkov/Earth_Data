import {nasaAPI} from "../forAPI";

const GET_PICTURE_OF_THE_DAY = `GET_PICTURE_OF_THE_DAY`
const SET_DATE_FOR_APOD = `SET_DATE_FOR_APOD`


const initialState = {
    pictureOFTheDay: null,
    date: `1996-12-30`,
}


const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PICTURE_OF_THE_DAY:
            return {
                ...state,
                pictureOFTheDay: action.picture
            }
        case SET_DATE_FOR_APOD:
            return {
                ...state,
                date: action.date
            }
        default:
            return state
    }
}

export default mainReducer


//AC
const getPictureOfTheDay = (picture) =>
    ( { type: GET_PICTURE_OF_THE_DAY, picture } )
export const setDateForApod = (date) =>
    ( { type: GET_PICTURE_OF_THE_DAY, date } )


//THUNK
export const setPictureOfTheDay = (apodDate) => {
    return async dispatch => {
        try {
            const response = await nasaAPI.getAPOD(apodDate)
            dispatch(getPictureOfTheDay(response.data))
        }catch (error) {
            console.log(error)
        }
    }
}
