import React, {useEffect} from "react";
import s from './earth.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getEarthObservation} from "../../reducers/earth";
import Preloader from "../../helpers/preloader";

const Earth = () => {

    const earthObs = useSelector(state => state.earth.earthObservation)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getEarthObservation)
    },[])

    if(!earthObs) return <Preloader />


    return (
        <div>
            <h2>Earth Observation Data</h2>
            <p>{earthObs.id}</p>
            <p>{earthObs.date}</p>
            <img className={s.image} src={earthObs.url} alt="earthObs"/>
        </div>
    )
}

export default Earth