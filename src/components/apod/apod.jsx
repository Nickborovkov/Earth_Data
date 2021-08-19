import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import s from './apod.module.css'
import common from '../../helpers/commonStyles/commonStyles.module.css'
import form from '../../helpers/formHelpers/formsStyles.module.css'
import Preloader from "../../helpers/preloaders/preloader";
import SetDateAPOD from "./datePickersAPOD/setDateAPOD";
import SetIntervalAPOD from "./datePickersAPOD/setIntervalAPOD";
import ApodItem from "./apodItem/apodItem";
import {useDispatch, useSelector} from "react-redux";
import {getApod, getApodWithInterval} from "../../reducers/apod";
import {setNewError} from "../../reducers/errors";
import { GiClick } from 'react-icons/gi';

const Apod = () => {

    //State
    const dispatch = useDispatch()

    const apodArray = useSelector(state => state.apod.apodArray)
    const currentDate = useSelector(state => state.apod.currentDate)
    const intervalDateStart = useSelector(state => state.apod.intervalDateStart)
    const intervalDateEnd = useSelector(state => state.apod.intervalDateEnd)
    const searchStart = useSelector(state => state.library.searchStart)
    const error = useSelector(state => state.errors.error)

    //Toggle exact date/date interval
    const [datePickerType, setDatePickerType] = useState(0)

    //Open/close parameters
    const [params, setParams] = useState(false)
    const setParameters = () => {
        params
            ? setParams(false)
            : setParams(true)
    }

    //Setting items
    useEffect(()=>{
        if(datePickerType === 0){
            dispatch(getApod(currentDate))
        }else if(datePickerType === 1){
            dispatch(getApodWithInterval(intervalDateStart,intervalDateEnd))
        }
    },[dispatch, datePickerType, currentDate, intervalDateStart, intervalDateEnd])

    //SearchStart = null when page loads (with this is's possible to go to other links)
    useEffect(()=>{
        dispatch(setNewError(null))
    },[dispatch])

    //Redirect to nasaLibrary when submit search field if header
    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.apod}>
           <h2 className={common.title}>NASA Picture Of The Day</h2>

            {/*Parameters section*/}
            {!params &&
            <button className={form.formOpenButton} onClick={setParameters}><GiClick/> Set parameters</button>}

            {params && <div>
                <button className={form.formOpenButton} onClick={setParameters}><GiClick/> Close parameters</button>
                <div>
                    {datePickerType === 0 &&
                    <div className={s.apodForm}>
                        <SetDateAPOD setParams={setParams}/>
                        <button className={s.apodButton}
                                onClick={ () => {setDatePickerType(1)} }>Choose interval</button>
                    </div>}

                    {datePickerType === 1 &&
                    <div className={s.apodForm}>
                        <SetIntervalAPOD setParams={setParams}/>
                        <button className={s.apodButton}
                                onClick={ () => {setDatePickerType(0)} }>Choose exact date</button>
                    </div>}
                </div>
            </div>}

            {/*Error case*/}
            {error && <h3 className={common.errorCase}>Not available, please change date</h3>}

            {/*Preloader*/}
            {apodArray.length === 0 && !error &&
            <Preloader/>}

            {/*Result*/}
            {apodArray.length !== 0 && !error &&
            <div className={s.apodList}>
                {apodArray.map(a => <ApodItem key={a.date}
                                                 item={a}/>)}
            </div>}

        </div>
    )
}

export default Apod