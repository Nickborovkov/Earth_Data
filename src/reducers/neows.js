import {nasaRequest} from "../serverRequests/serverRequests";
import {dateToday} from "../helpers/dateHelper/dateToday";
import {setNewError, toggleIsFetching} from "./common";

const SET_NEOWS = `NASA/neows/SET_NEOWS`
const SET_INTERVAL_DATE = `NASA/neows/SET_INTERVAL_DATE`


const initialState = {
    neowsArray: ``,
    intervalDateStart: dateToday,
    intervalDateEnd: dateToday,
}


const neowsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEOWS:
            return {
                ...state,
                neowsArray: action.neowsArray
            }
        case SET_INTERVAL_DATE:
            return {
                ...state,
                intervalDateStart: action.start,
                intervalDateEnd: action.end,
            }
        default:
            return state
    }
}


export default neowsReducer


//AC
const setNeows = (neowsArray) =>
    ({type: SET_NEOWS, neowsArray})

export const setIntervalDate = (start, end) =>
    ({type: SET_INTERVAL_DATE, start, end})


//THINK
export const getNeows = (startDate, endDate) => async dispatch => {
    try {
        dispatch(toggleIsFetching(true))
        const response = await nasaRequest.getNeows(startDate, endDate)
        dispatch(setNeows(response.data.near_earth_objects))
        dispatch(toggleIsFetching(false))
    }catch (error) {
        dispatch(setNewError(error))
    }

}