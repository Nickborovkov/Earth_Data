import React, {useEffect} from "react";
import s from './nasaLibrary.module.css'
import m from './nasaLibraryMedia.module.css'
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {getSearchResult, setSearchStart} from "../../reducers/nasaLibrary";
import Preloader from "../../helpers/preloaders/preloader";
import {setNewError} from "../../reducers/errors";
import NASALibraryItem from "./NasaLIbraryItem/NASALibraryItem";
import Pagination from "../../helpers/Pagination/pagination";

const NasaLibrary = () => {

    const dispatch = useDispatch()

    //State
    const isFetching = useSelector(state => state.library.isFetching)
    const result = useSelector(state => state.library.result)
    const searchStart = useSelector(state => state.library.searchStart)
    const currentSearch = useSelector(state => state.library.currentSearch)
    const page = useSelector(state => state.library.page)
    const totalPages = useSelector(state => state.library.totalPages)
    //*********************************************************************************
    const mediaType = useSelector(state => state.library.mediaType)
    const yearStart = useSelector(state => state.library.yearStart)
    const yearEnd = useSelector(state => state.library.yearEnd)

    //Error state
    const error = useSelector(state => state.errors.error)

    //Setting items
    useEffect(()=>{
        dispatch(getSearchResult(currentSearch, mediaType, yearStart, yearEnd, page))
        window.scrollTo(0, 0)
    },[dispatch, currentSearch, mediaType, yearStart, yearEnd, page])

    //Error = null when page loads
    useEffect(()=>{
        dispatch(setNewError(null))
    },[dispatch])

    //SearchStart = null when page loads (with this is's possible to go to other links)
    useEffect(()=>{
        dispatch(setSearchStart(false))
    },[dispatch, searchStart])


    return (
        <div className={s.nasaLibrary}>
            <h2 className={cn(s.title, m.title)}>NASA photo and Video library</h2>

            {/*Error case*/}
            {!result && error &&
            <div className={s.errorCase}>No results for this search</div>}

            {/*Preloader*/}
            {!result && !error &&
            <Preloader/>}

            {/*Result*/}
            {result && !error &&
            <div>
                {/*Preloader*/}
                {isFetching && <Preloader />}

                {/*Result items*/}
                {!isFetching &&
                <div className={s.itemsArray}>
                    {result.map(r => <NASALibraryItem key={result.indexOf(r)}
                                                      item={r}
                                                      mediaType={mediaType}/>)}
                </div>}

                {/*Pagination*/}
                <Pagination page = {page}
                            prevPageCondition = {'1'}
                            nextPageCondition = {totalPages}/>

            </div>}

        </div>
    )
}

export default NasaLibrary