import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import s from './earthEpic.module.css'
import common from '../../helpers/commonStyles/commonStyles.module.css'
import form from '../../helpers/formHelpers/formsStyles.module.css'
import Preloader from "../../helpers/preloaders/preloader";
import DatePickerEpic from "./datePickerEPIC/datePickerEpic";
import EarthEPICItem from "./earthEPICItem/earthEpicItem";
import {useDispatch, useSelector} from "react-redux";
import {getEarthImage} from "../../reducers/earthEpic";
import {setNewError} from "../../reducers/errors";
import { GiClick } from 'react-icons/gi';

const EarthEpic = () => {

    //State
    const dispatch = useDispatch()

    const earthImage = useSelector(state => state.earthImage.earthImage)
    const SelectedDate = useSelector(state => state.earthImage.date)
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
    useEffect(() => {
        dispatch(getEarthImage(SelectedDate))
    }, [dispatch, SelectedDate])

    //SearchStart = null when page loads (with this is's possible to go to other links)
    useEffect(()=>{
        dispatch(setNewError(null))
    },[dispatch])

    //Redirect to nasaLibrary when submit search field if header
    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.earthImage}>
            <h2 className={common.title}>Earth Polychromatic Imaging Camera Photos</h2>

            {/*Parameters section*/}
            {!params &&
            <button className={form.formOpenButton} onClick={setParameters}><GiClick/> Set parameters</button>}

            {params && <div>
                <button className={form.formOpenButton} onClick={setParameters}><GiClick/> Close parameters</button>
                <DatePickerEpic setParams={setParams}/>
            </div>}

            {/*Error case*/}
            {error && <h3 className={common.errorCase}>Not available, please change date</h3>}

            {/*Preloader*/}
            {!earthImage && !error &&
            <Preloader/>}

            {/*Result*/}
            {earthImage && !error &&
            <div className={s.imagesArray}>
                {earthImage.map(e => <EarthEPICItem key={e.identifier}
                                                       item={e}/>)}
            </div>}
        </div>
    )
}

export default EarthEpic