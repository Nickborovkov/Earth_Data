import {nasaRequest} from "../serverRequests/serverRequests";
import {setNewError, toggleIsFetching} from "./common";
import axios from "axios";

const SET_SEARCH_RESULT = `nasa/nasaLibrary/SET_SEARCH_RESULT`
const SET_SEARCH_START = `nasa/nasaLibrary/SET_SEARCH_START`
const SET_CURRENT_SEARCH = `nasa/nasaLibrary/SET_CURRENT_SEARCH`
const SET_VIDEOS_LINKS = `nasa/nasaLibrary/SET_VIDEOS_LINKS`
const SET_TOTAL_PAGES = `nasa/nasaLibrary/SET_TOTAL_PAGES`
const SET_DATE_INTERVAL = `nasa/nasaLibrary/SET_DATE_INTERVAL`
const SET_MEDIA_TYPE = `nasa/nasaLibrary/SET_MEDIA_TYPE`
const NEXT_PAGE = `nasa/nasaLibrary/NEXT_PAGE`
const PREV_PAGE = `nasa/nasaLibrary/PREV_PAGE`


const initialState = {
    result: [],
    currentSearch: null,
    searchStart: false,
    videosLinks: [],
    mediaType: `image`,
    yearStart: `2019`,
    yearEnd: `2021`,
    totalPages: ``,
    page: 1,
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
        case SET_VIDEOS_LINKS:
            return {
                ...state,
                videosLinks: action.videosLinks,
            }
        case SET_DATE_INTERVAL:
            return {
                ...state,
                yearStart: action.yearStart ,
                yearEnd: action.yearEnd ,
            }
        case SET_MEDIA_TYPE:
            return {
                ...state,
                mediaType: action.mediaType ,
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

export const setVideosLinks = (videosLinks) =>
    ( { type:  SET_VIDEOS_LINKS, videosLinks} )

export const setCurrentSearch = (currentSearch) =>
    ( { type:  SET_CURRENT_SEARCH, currentSearch} )

export const setDateIntervalLibrary = (yearStart, yearEnd) =>
    ( { type:  SET_DATE_INTERVAL, yearStart, yearEnd} )

export const setMediaTypeLIbrary = (mediaType) =>
    ( { type:  SET_MEDIA_TYPE, mediaType } )

export const nextPage = () =>
    ( { type:  NEXT_PAGE} )

export const prevPage = () =>
    ( { type:  PREV_PAGE} )

export const setTotalPages = (totalPages) =>
    ( { type:  SET_TOTAL_PAGES, totalPages} )



//THUNK
export const getSearchResult = (search, mediaType, yearStart, yearEnd, page) => async dispatch => {
    try {
        dispatch(toggleIsFetching(true))
        dispatch(setSearchResult(null))
        dispatch(setSearchStart(true))
        const response = await nasaRequest.searchNasaLibrary(search, mediaType, yearStart, yearEnd, page)
        if(response.data.collection.metadata.total_hits !== 0){
            dispatch(setSearchResult(response.data.collection.items))
            dispatch(setTotalPages(response.data.collection.metadata.total_hits))
            dispatch(toggleIsFetching(false))
        }else {
            dispatch(setNewError(`No results for search`))
        }

    }catch (error) {
        dispatch(setNewError(error))
    }
}

//Thunk for getting links for videos (video links comes as a json)
export const getVideoLinks = (json) => async dispatch => {
    const response = await axios.get(json.toString())
    dispatch(setVideosLinks(response.data))
}