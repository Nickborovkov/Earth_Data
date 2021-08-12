import {nasaRequest} from "../serverRequests/serverRequests";

const SET_SEARCH_RESULT = `nasa/nasaLibrary/SET_SEARCH_RESULT`
const SET_SEARCH_START = `nasa/nasaLibrary/SET_SEARCH_START`
const TOGGLE_FETCHING = `nasa/nasaLibrary/TOGGLE_FETCHING`
const SET_CURRENT_SEARCH = `nasa/nasaLibrary/SET_CURRENT_SEARCH`
const SET_TOTAL_PAGES = `nasa/nasaLibrary/SET_TOTAL_PAGES`
const SET_MEDIA_TYPE = `nasa/nasaLibrary/SET_MEDIA_TYPE`
const SET_START_YEAR = `nasa/nasaLibrary/SET_START_YEAR`
const SET_END_YEAR = `nasa/nasaLibrary/SET_END_YEAR`
const NEXT_PAGE = `nasa/nasaLibrary/NEXT_PAGE`
const PREV_PAGE = `nasa/nasaLibrary/PREV_PAGE`
const SET_ERROR = `nasa/nasaLibrary/SET_ERROR`


const initialState = {
    result: null,
    currentSearch: null,
    searchStart: false,
    mediaType: `image`,
    yearStart: `2005`,
    yearEnd: `2021`,
    totalPages: ``,
    page: 1,
    isFetching: false,
    errorMessage: ``
}


const nasaLibraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_RESULT:
            return {
                ...state,
                result: action.result
            }
        case SET_CURRENT_SEARCH:
            return {
                ...state,
                currentSearch: action.currentSearch
            }
        case SET_SEARCH_START:
            return {
                ...state,
                searchStart: action.searchStart
            }
        case TOGGLE_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_MEDIA_TYPE:
            return {
                ...state,
                mediaType: action.mediaType
            }
        case SET_START_YEAR:
            return {
                ...state,
                yearStart: action.yearStart
            }
        case SET_END_YEAR:
            return {
                ...state,
                yearEnd: action.yearEnd
            }
        case SET_TOTAL_PAGES:
            return {
                ...state,
                totalPages: Math.ceil(action.totalPages / 100)
            }
        case NEXT_PAGE:
            return {
                ...state,
                page: state.page + 1
            }
        case PREV_PAGE:
            return {
                ...state,
                page: state.page - 1
            }
        case SET_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}


export default nasaLibraryReducer


//AC
const setSearchResult = (result) =>
    ( { type:  SET_SEARCH_RESULT, result} )

export const setSearchStart = (searchStart) =>
    ( { type:  SET_SEARCH_START, searchStart} )

export const setCurrentSearch = (currentSearch) =>
    ( { type:  SET_CURRENT_SEARCH, currentSearch} )

export const toggleFetching = (isFetching) =>
    ( { type:  TOGGLE_FETCHING, isFetching} )

export const setError = (errorMessage) =>
    ( { type:  SET_ERROR, errorMessage} )

//*****************
export const setMediaType = (mediaType) =>
    ( { type:  SET_MEDIA_TYPE, mediaType} )

export const setStartYear = (startYear) =>
    ( { type:  SET_START_YEAR, startYear} )

export const setEndYear = (endYear) =>
    ( { type:  SET_END_YEAR, endYear} )
//***************

export const nextPage = () =>
    ( { type:  NEXT_PAGE} )

export const prevPage = () =>
    ( { type:  PREV_PAGE} )

export const setTotalPages = (totalPages) =>
    ( { type:  SET_TOTAL_PAGES, totalPages} )



//THUNK
export const getSearchResult = (search, mediaType, yearStart, yearEnd, page) => async dispatch => {
    dispatch(setSearchResult(null))
    dispatch(setSearchStart(true))
    dispatch(toggleFetching(true))
    try {
        await nasaRequest.searchNasaLibrary(search, mediaType, yearStart, yearEnd, page)
    }catch (e) {
        alert(e)
    }finally {

        const response = await nasaRequest.searchNasaLibrary(search, mediaType, yearStart, yearEnd, page)
        dispatch(toggleFetching(false))
        dispatch(setSearchResult(response.data.collection.items))
        dispatch(setTotalPages(response.data.collection.metadata.total_hits))
    }
}