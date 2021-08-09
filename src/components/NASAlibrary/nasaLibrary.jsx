import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getSearchResult} from "../../reducers/nasaLibrary";

const NasaLibrary = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getSearchResult)
    },[dispatch])

    return (
        <div>
            <h2>NASA photo and Video library</h2>
        </div>
    )
}

export default NasaLibrary