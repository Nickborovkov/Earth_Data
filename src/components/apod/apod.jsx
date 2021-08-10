import React, {useEffect, useState} from "react";
import s from './apod.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getApod, getApodWithInterval} from "../../reducers/apod";
import Preloader from "../../helpers/preloader";
import SetDateAPOD from "./datePickers/setDateAPOD";
import SetIntervalAPOD from "./datePickers/setIntervalAPOD";
import {Redirect} from "react-router-dom";
import cn from 'classnames'

const Apod = () => {

    const dispatch = useDispatch()
    const apodArray = useSelector(state => state.apod.apodArray)
    const currentDate = useSelector(state => state.apod.currentDate)
    const intervalDateStart = useSelector(state => state.apod.intervalDateStart)
    const intervalDateEnd = useSelector(state => state.apod.intervalDateEnd)
    const searchStart = useSelector(state => state.library.searchStart)

    const [datePickerType, setDatePickerType] = useState(0)

    useEffect(()=>{
        if(datePickerType === 0){
            dispatch(getApod(currentDate))
        }
    },[dispatch, datePickerType, currentDate])

    useEffect(()=>{
        if(datePickerType === 1){
            dispatch(getApodWithInterval(intervalDateStart,intervalDateEnd))
        }
    },[dispatch, datePickerType, intervalDateStart, intervalDateEnd])



    if(apodArray.length === 0) return <Preloader />

    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.apod}>
           <h2 className={s.title}>A picture of the day</h2>
            {datePickerType === 0 &&
            <div>
                <SetDateAPOD />
                <button onClick={ () => {setDatePickerType(1)} }>Choose interval</button>
            </div>}

            {datePickerType === 1 &&
            <div>
                <SetIntervalAPOD />
                <button onClick={ () => {setDatePickerType(0)} }>Choose exact date</button>
            </div>}

            <div>
                {
                    apodArray.map(a => <div className={cn(s.apodItem, apodArray.length >1 && s.apodMany)} key={a.date}>
                        <h3 className={s.apodTitle}>{a.title}</h3>
                        <div className={s.apodImageHolder}>
                            <img className={s.apodImage} src={a.url} alt="Not available"/>
                        </div>
                        <p className={s.apodDate}>Date: {a.date}</p>
                        <p className={s.apodExpTitle}>Explanation</p>
                        <p className={s.apodExplanation}>{a.explanation}</p>


                    </div>)
                }
            </div>
        </div>
    )
}

export default Apod