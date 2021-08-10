import {nasaRequest} from "../serverRequests/serverRequests";

const SET_SEARCH_RESULT = `nasa/nasaLibrary/SET_SEARCH_RESULT`
const SET_CURRENT_SEARCH = `nasa/nasaLibrary/SET_CURRENT_SEARCH`


const initialState = {
    result: {},
    currentSearch: ``
}


const nasaLibraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_RESULT:
            return {
                ...state,
                result: {...action.result}
            }
        case SET_CURRENT_SEARCH:
            return {
                ...state,
                currentSearch: action.currentSearch
            }
        default:
            return state
    }
}


export default nasaLibraryReducer


//AC
const setSearchResult = (result) =>
    ( { type:  SET_SEARCH_RESULT, result} )

export const setCurrentSearch = (currentSearch) =>
    ( { type:  SET_CURRENT_SEARCH, currentSearch} )


//THUNK
export const getSearchResult = (search) => async dispatch => {
    const response = await nasaRequest.searchNasaLibrary(search)
    dispatch(setSearchResult(response.data.collection))
}