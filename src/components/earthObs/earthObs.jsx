import React, {useEffect, useState} from "react";
import s from './earthObs.module.css'
import m from './earthObsMedia.module.css'
import common from '../../helpers/commonStyles/commonStyles.module.css'
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {getEarthObservation} from "../../reducers/earthObs";
import Preloader from "../../helpers/preloaders/preloader";
import ParamsPickerEarthObs from "./paramsPickerEarthOBS/paramsPickerEarthObs";
import {Redirect} from "react-router-dom";
import {setNewError} from "../../reducers/errors";
import imagePlaceHolder from "../../images/imagePlaceholder.jpg";
import ModalWindow from "../../helpers/modalWindow/modalWindow";

const EarthObs = () => {

    const dispatch = useDispatch()
    const earthObs = useSelector(state => state.earth.earthObservation)
    const longitude = useSelector(state => state.earth.longitude)
    const latitude = useSelector(state => state.earth.latitude)
    const searchStart = useSelector(state => state.library.searchStart)
    const error = useSelector(state => state.errors.error)

    const [modalWindow, setModalWindow] = useState(false)
    const [modalSrc, setModalSrc] = useState(``)

    useEffect(()=>{
        dispatch(getEarthObservation(longitude, latitude))
    },[dispatch, longitude, latitude])

    useEffect(()=>{
       dispatch(setNewError(null))
    },[dispatch])


    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.earth}>
            <h2 className={cn(s.title, m.title)}>NASA Landsat Satellite Imagery Data</h2>
            <ParamsPickerEarthObs />


            {!earthObs && !error &&
            <Preloader/>}

            {earthObs && !error &&
            <div className={cn(s.result, m.result)}>
                <p className={s.earthParams}>ID: {earthObs.id}</p>
                <p className={s.earthParams}>Date: {earthObs.date}</p>
                <div className={s.imageHolder}>
                    <img className={s.image}
                         src={earthObs.url}
                         alt="earthObs"
                         onClick={ (e) => {
                             setModalWindow(true)
                             setModalSrc(e.currentTarget.src)
                         }}
                         onError={ (e) => {e.target.src = imagePlaceHolder}}/>
                </div>
            </div>
            }

            {modalWindow &&
            <ModalWindow active={modalWindow} setActive={setModalWindow}>
                <img className={cn(common.modalImage)}
                     src={modalSrc}
                     alt="modal"/>
            </ModalWindow>}

        </div>
    )
}

export default EarthObs