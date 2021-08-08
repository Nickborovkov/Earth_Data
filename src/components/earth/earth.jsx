import React, {useEffect} from "react";
import s from './earth.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getEarthObservation} from "../../reducers/earth";
import Preloader from "../../helpers/preloader";
import ParametersPicker from "./parametersPicker/parametersPicker";

const Earth = () => {

    const dispatch = useDispatch()
    const earthObs = useSelector(state => state.earth.earthObservation)
    const longitude = useSelector(state => state.earth.longitude)
    const latitude = useSelector(state => state.earth.latitude)
    const date = useSelector(state => state.earth.date)
    const dimensions = useSelector(state => state.earth.dimensions)

    useEffect(()=>{
        dispatch(getEarthObservation(longitude, latitude, date, dimensions))
    },[dispatch, longitude, latitude, date, dimensions])

    if(!earthObs) return <Preloader />


    return (
        <div>
            <h2>Earth Observation Data</h2>
            <ParametersPicker />
            <p>{earthObs.id}</p>
            <p>{earthObs.date}</p>
            <img className={s.image} src={earthObs.url} alt="earthObs"/>
        </div>
    )
}

export default Earth