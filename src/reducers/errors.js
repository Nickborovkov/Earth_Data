const SET_ERROR = `NASA/errors/SET_ERROR`


const initialState = {
    error: null,
}


const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.newError
            }
        default:
            return state
    }
}


export default errorsReducer


//AC
export const setNewError = (newError) =>
    ( {type: SET_ERROR, newError} )