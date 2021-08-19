import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import s from './earthObs.module.css'
import common from '../../helpers/commonStyles/commonStyles.module.css'
import form from '../../helpers/formHelpers/formsStyles.module.css'
import Preloader from "../../helpers/preloaders/preloader";
import ParamsPickerEarthObs from "./paramsPickerEarthOBS/paramsPickerEarthObs";
import EarthObsItem from "./earthObsItem/earthObsItem";
import {useDispatch, useSelector} from "react-redux";
import {getEarthObservation} from "../../reducers/earthObs";
import {setNewError} from "../../reducers/errors";
import { GiClick } from 'react-icons/gi';

const EarthObs = () => {

    //State
    const dispatch = useDispatch()

    const earthObs = useSelector(state => state.earth.earthObservation)
    const longitude = useSelector(state => state.earth.longitude)
    const latitude = useSelector(state => state.earth.latitude)
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
        dispatch(getEarthObservation(longitude, latitude))
    },[dispatch, longitude, latitude])

    //SearchStart = null when page loads (with this is's possible to go to other links)
    useEffect(()=>{
       dispatch(setNewError(null))
    },[dispatch])

    //Redirect to nasaLibrary when submit search field if header
    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.earth}>
            <h2 className={common.title}>NASA Landsat Satellite Imagery Data</h2>

            {/*Parameters section*/}
            {!params &&
            <button className={form.formOpenButton} onClick={setParameters}><GiClick/> Set parameters</button>}

            {params && <div>
                <button className={form.formOpenButton} onClick={setParameters}><GiClick/> Close parameters</button>
                <ParamsPickerEarthObs setParams={setParams}/>
            </div>}

            {/*Error case*/}
            {error && <h3 className={common.errorCase}>Not available, please change parameters</h3>}

            {/*Preloader*/}
            {!earthObs && !error &&
            <Preloader/>}

            {/*Result*/}
            {earthObs && !error &&
            <EarthObsItem item={earthObs}/>}

        </div>
    )
}

export default EarthObs