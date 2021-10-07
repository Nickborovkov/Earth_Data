const SET_ERROR = `NASA/common/SET_ERROR`
const TOGGLE_IS_FETCHING = `NASA/common/TOGGLE_IS_FETCHING`


const initialState = {
    error: null,
    isFetching: false,
}


const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.newError
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}


export default commonReducer


//AC
export const setNewError = (newError) =>
    ( {type: SET_ERROR, newError} )

export const toggleIsFetching = (isFetching) =>
    ( {type: TOGGLE_IS_FETCHING, isFetching} )