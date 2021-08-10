import React, {useEffect} from "react";
import s from './earth.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getEarthObservation} from "../../reducers/earth";
import Preloader from "../../helpers/preloader";
import ParametersPicker from "./parametersPicker/parametersPicker";
import {Redirect} from "react-router-dom";

const Earth = () => {

    const dispatch = useDispatch()
    const earthObs = useSelector(state => state.earth.earthObservation)
    const longitude = useSelector(state => state.earth.longitude)
    const latitude = useSelector(state => state.earth.latitude)
    const date = useSelector(state => state.earth.date)
    const dimensions = useSelector(state => state.earth.dimensions)
    const searchStart = useSelector(state => state.library.searchStart)


    useEffect(()=>{
        dispatch(getEarthObservation(longitude, latitude, date, dimensions))
    },[dispatch, longitude, latitude, date, dimensions])

    if(!earthObs) return <Preloader />


    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.earth}>
            <h2 className={s.title}>Earth Observation Data</h2>
            <ParametersPicker />
            <p className={s.earthParams}>ID: {earthObs.id}</p>
            <p className={s.earthParams}>Date: {earthObs.date}</p>
            <div className={s.imageHolder}>
                <img className={s.image} src={earthObs.url} alt="earthObs"/>
            </div>

        </div>
    )
}

export default Earth