import React, {useEffect, useState} from "react";
import s from './nasaLibrary.module.css'
import common from '../../helpers/commonStyles/commonStyles.module.css'
import form from '../../helpers/formHelpers/formsStyles.module.css'
import cn from 'classnames'
import Preloader from "../../helpers/preloaders/preloader";
import NASALibraryItem from "./NasaLIbraryItem/NASALibraryItem";
import ParamsPickerLIBRARY from "./paramsPickerLIBRARY/paramsPickerLIBRARY";
import Pagination from "../../helpers/Pagination/pagination";
import {useDispatch, useSelector} from "react-redux";
import {getSearchResult, nextPage, prevPage,
    setMediaTypeLIbrary, setSearchStart} from "../../reducers/nasaLibrary";
import {setNewError} from "../../reducers/errors";
import { GiClick } from 'react-icons/gi';
import { BsCameraVideo } from 'react-icons/bs';
import { HiOutlinePhotograph } from 'react-icons/hi';

const NasaLibrary = () => {

    //State
    const dispatch = useDispatch()

    const isFetching = useSelector(state => state.library.isFetching)
    const result = useSelector(state => state.library.result)
    const searchStart = useSelector(state => state.library.searchStart)
    const currentSearch = useSelector(state => state.library.currentSearch)
    const page = useSelector(state => state.library.page)
    const totalPages = useSelector(state => state.library.totalPages)
    const mediaType = useSelector(state => state.library.mediaType)
    const yearStart = useSelector(state => state.library.yearStart)
    const yearEnd = useSelector(state => state.library.yearEnd)

    //Open/close parameters
    const [params, setParams] = useState(false)
    const setParameters = () => {
        params
            ? setParams(false)
            : setParams(true)
    }

    //Active style for pressed media bytton
    const [mediaActive, setMediaActive] = useState({
        image: true,
        video: false
    })

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
            <h2 className={common.title}>NASA photo and Video library</h2>

            {/*Media type section*/}
            <div className={s.mediaType}>
                <button className={cn(s.mediaTypeButton, mediaActive.image && s.mediaBtnAct)}
                        onClick={ () => {
                            dispatch(setMediaTypeLIbrary(`image`))
                            dispatch(setNewError(null))
                            setMediaActive({image: true, video: false})
                        } }>
                    <HiOutlinePhotograph className={s.mediaIcon}/> Images</button>
                <button className={cn(s.mediaTypeButton, mediaActive.video && s.mediaBtnAct)}
                        onClick={ () => {
                            dispatch(setMediaTypeLIbrary(`video`))
                            dispatch(setNewError(null))
                            setMediaActive({image: false, video: true})
                        } }>
                    <BsCameraVideo className={s.mediaIcon}/> Videos</button>
            </div>

            {/*Parameters section*/}
            {!params &&
            <button className={form.formOpenButton} onClick={setParameters}>
                <GiClick/> Set parameters</button>}

            {params && <div>
                <button className={form.formOpenButton} onClick={setParameters}>
                    <GiClick/> Close parameters</button>
                <ParamsPickerLIBRARY setParams={setParams}/>
            </div>}

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
                            prevPageDispatch={prevPage}
                            nextPageCondition = {totalPages}
                            nextPageDispatch={nextPage}/>

            </div>}

        </div>
    )
}

export default NasaLibrary