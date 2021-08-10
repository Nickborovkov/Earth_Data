import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSearchResult} from "../../reducers/nasaLibrary";
import SearchForm from "./searchForm/seaarchForm";

const NasaLibrary = () => {

    const dispatch = useDispatch()
    const currentSearch = useSelector(state => state.library.currentSearch)

    useEffect(()=>{
        dispatch(getSearchResult(currentSearch))
    },[dispatch, currentSearch])

    return (
        <div>
            <h2>NASA photo and Video library</h2>
            <SearchForm />
        </div>
    )
}

export default NasaLibrary