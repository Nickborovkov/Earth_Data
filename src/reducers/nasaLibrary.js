import {nasaRequest} from "../serverRequests/serverRequests";

const SET_SEARCH_RESULT = `nasa/nasaLibrary/SET_SEARCH_RESULT`


const initialState = {
    result: {}
}


const nasaLibraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_RESULT:
            return {
                ...state,
                ...action.result
            }
        default:
            return state
    }
}


export default nasaLibraryReducer


//AC
const setSearchResult = (result) =>
    ( { type:  SET_SEARCH_RESULT, result} )


//THUNK
export const getSearchResult = () => async dispatch => {
    const response = await nasaRequest.searchNasaLibrary()
    dispatch(setSearchResult(response.data.collection))
}