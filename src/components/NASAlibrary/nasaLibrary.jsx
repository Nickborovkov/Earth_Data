import React, {memo, useEffect, useState} from "react";
import s from './nasaLibrary.module.css'
import common from '../../helpers/commonStyles/commonStyles.module.css'
import form from '../../helpers/formHelpers/formsStyles.module.css'
import cn from 'classnames'
import Preloader from "../common/preloaders/preloader";
import NASALibraryItem from "./NasaLIbraryItem/NASALibraryItem";
import ParamsPickerLIBRARY from "./paramsPickerLIBRARY/paramsPickerLIBRARY";
import Pagination from "../common/pagination/pagination";
import {useDispatch, useSelector} from "react-redux";
import {getSearchResult, nextPage, prevPage,
    setMediaTypeLIbrary, setSearchStart} from "../../store/nasaLibraryReducer";
import {setNewError} from "../../store/commonReducer";
import { GiClick } from 'react-icons/gi';
import { BsCameraVideo } from 'react-icons/bs';
import { HiOutlinePhotograph } from 'react-icons/hi';

const NasaLibrary = memo(() => {

    //State
    const dispatch = useDispatch()

    const result = useSelector(state => state.library.result)
    const searchStart = useSelector(state => state.library.searchStart)
    const currentSearch = useSelector(state => state.library.currentSearch)
    const page = useSelector(state => state.library.page)
    const totalPages = useSelector(state => state.library.totalPages)
    const mediaType = useSelector(state => state.library.mediaType)
    const yearStart = useSelector(state => state.library.yearStart)
    const yearEnd = useSelector(state => state.library.yearEnd)
    const isFetching = useSelector(state => state.common.isFetching)
    const error = useSelector(state => state.common.error)

    //Open/close parameters
    const [params, setParams] = useState(false)
    const setParameters = () => {
        params
            ? setParams(false)
            : setParams(true)
    }

    //Active style for pressed media button
    const [mediaActive, setMediaActive] = useState({
        image: true,
        video: false
    })


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
            <div className={s.yearHolder}>
                <p className={s.year}>Start year: {yearStart}</p>
                <p className={s.year}>End year: {yearEnd}</p>
            </div>


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
            {error &&
            <div className={s.errorCase}>No results for this search</div>}

            {/*Preloader*/}
            {isFetching && !error &&
            <Preloader/>}

            {/*Result*/}
            {!isFetching && !error &&
            <div>
                {/*Result items*/}
                <div className={s.itemsArray}>
                    {result.map(r => <NASALibraryItem key={result.indexOf(r)}
                                                      item={r}
                                                      mediaType={mediaType}/>)}
                </div>

                {/*pagination*/}
                <Pagination page = {page}
                            prevPageCondition = {'1'}
                            prevPageDispatch={prevPage}
                            nextPageCondition = {totalPages}
                            nextPageDispatch={nextPage}/>

            </div>}

        </div>
    )
})

export default NasaLibrary
