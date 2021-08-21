import {nasaRequest} from "../serverRequests/serverRequests";
import {dateToday} from "../helpers/dateHelper/dateToday";
import {setNewError} from "./errors";
import imagePreloader from '../helpers/preloaders/imageLoader.gif'

const SET_APOD = `NASA/apod/SET_APOD`
const SET_APOD_WITH_INTERVAL = `NASA/apod/SET_APOD_WITH_INTERVAL`
const SET_CURRENT_DATE = `NASA/apod/SET_CURRENT_DATE`
const SET_INTERVAL = `NASA/apod/SET_INTERVAL`



const initialState = {
    apodArray: [{
        url: imagePreloader
    }],
    currentDate: dateToday,
    intervalDateStart: dateToday,
    intervalDateEnd: dateToday,
}


const apodReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APOD:
            return {
                ...state,
                apodArray: [action.apodArray]
            }
        case SET_APOD_WITH_INTERVAL:
            return {
                ...state,
                apodArray: action.apodArray
            }
        case SET_CURRENT_DATE:
            return {
                ...state,
                currentDate: action.currentDate
            }
        case SET_INTERVAL:
            return {
                ...state,
                intervalDateStart: action.start,
                intervalDateEnd: action.end,
            }
        default:
            return state
    }
}


export default apodReducer


//AC
const setApod = (apodArray) =>
    ( {type: SET_APOD, apodArray} )

const setApodWithInterval = (apodArray) =>
    ( {type: SET_APOD_WITH_INTERVAL, apodArray} )

export const setCurrentDate = (currentDate) =>
    ( {type: SET_CURRENT_DATE, currentDate} )

export const setIntervalDates = (start, end) =>
    ( {type: SET_INTERVAL, start, end} )


//THUNK
export const getApod = (date) => async dispatch => {
    let response
    try {
        response = await nasaRequest.getAPOD(date)
        dispatch(setApod(response.data))
    }catch (error) {
        dispatch(setNewError(error.message))
    }
}

export const getApodWithInterval = (startDate, endDate) => async dispatch => {
    const response = await nasaRequest.getAPODwithInterval(startDate, endDate)
    dispatch(setApodWithInterval(response.data))
}