import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import s from './marsRover.module.css'
import common from '../../helpers/commonStyles/commonStyles.module.css'
import form from '../../helpers/formHelpers/formsStyles.module.css'
import Preloader from "../../helpers/preloaders/preloader";
import ParamsPickerROVER from "./paramsPickerROVER/paramsPickerROVER";
import MarsRoverItem from "./marsRoverItem/marsRoverItem";
import Pagination from "../../helpers/Pagination/pagination";
import {useDispatch, useSelector} from "react-redux";
import {getMarsRoverPhotos, roverNextPage, roverPrevPage} from "../../reducers/marsRover";
import {setNewError} from "../../reducers/errors";
import { GiClick } from 'react-icons/gi';

const MarsRover = () => {

    //State
    const dispatch = useDispatch()

    const marsRoverPhotos = useSelector(state => state.marsRover.marsRoverPhotos)
    const rover = useSelector(state => state.marsRover.rover)
    const date = useSelector(state => state.marsRover.date)
    const page = useSelector(state => state.marsRover.page)
    const searchStart = useSelector(state => state.library.searchStart)
    const error = useSelector(state => state.errors.error)

    //Open/close parameters
    const [params, setParams] = useState(false)
    const setParameters = () => {
        params
            ? setParams(false)
            : setParams(true)
    }

    //Setting items
    useEffect(()=>{
        dispatch(getMarsRoverPhotos(rover, date, page))
        window.scrollTo(0, 0)
    },[dispatch, rover, date, page])

    //SearchStart = null when page loads (with this is's possible to go to other links)
    useEffect(()=>{
        dispatch(setNewError(null))
    },[dispatch])

    //Redirect to nasaLibrary when submit search field if header
    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.marsRover}>
           <h1 className={common.title}>Image Data Gathered By NASA's Rovers On Mars</h1>

            {/*Parameters section*/}
            {!params &&
            <button className={form.formOpenButton} onClick={setParameters}><GiClick/> Set parameters</button>}

            {params && <div>
                <button className={form.formOpenButton} onClick={setParameters}><GiClick/> Close parameters</button>
                <ParamsPickerROVER setParams={setParams}/>
            </div>}

            {/*Error case*/}
            {error && <h3 className={common.errorCase}>Not available, please change date</h3>}

            {/*Preloader*/}
            {marsRoverPhotos.length === 0 && !error &&
            <Preloader/>}

            {/*Result*/}
            {marsRoverPhotos.length !== 0 && !error &&
            <div>
                <div className={s.items}>
                    {marsRoverPhotos.map(r => <MarsRoverItem key={r.id}
                                                                item={r}/>)}
                </div>

                {/*Pagination*/}
                <Pagination page = {page}
                            prevPageCondition = {'1'}
                            prevPageDispatch={roverPrevPage}
                            nextPageCondition = {``}
                            nextPageDispatch={roverNextPage}/>


            </div>}
        </div>
    )
}

export default MarsRover