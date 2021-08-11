import React, {useEffect, useState} from "react";
import s from './apod.module.css'
import m from './apodMedia.module.css'
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {getApod, getApodWithInterval} from "../../reducers/apod";
import Preloader from "../../helpers/preloaders/preloader";
import SetDateAPOD from "./datePickers/setDateAPOD";
import SetIntervalAPOD from "./datePickers/setIntervalAPOD";
import {Redirect} from "react-router-dom";

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
           <h2 className={cn(s.title, m.title)}>See NASA picture of the day</h2>
            {datePickerType === 0 &&
            <div className={s.apodForm}>
                <SetDateAPOD />
                <button className={s.apodButton} onClick={ () => {setDatePickerType(1)} }>Choose interval</button>
            </div>}

            {datePickerType === 1 &&
            <div className={s.apodForm}>
                <SetIntervalAPOD />
                <button className={s.apodButton}
                        onClick={ () => {setDatePickerType(0)} }>Choose exact date</button>
            </div>}

                    <div className={s.apodList}>
                {
                    apodArray.map(a => <div className={cn(s.apodItem, m.apodItem)} key={a.date}>
                        <h3 className={cn(s.apodTitle, m.apodTitle)}>{a.title}</h3>
                        <div className={s.apodImageHolder}>
                            <img className={s.apodImage} src={a.url} alt="Not available"/>
                        </div>
                        <p className={cn(s.apodDate, m.apodDate)}>Date: {a.date}</p>
                        <p className={cn(s.apodExpTitle, m.apodExpTitle)}>Explanation</p>
                        <p className={cn(s.apodExplanation, m.apodExplanation)}>{a.explanation}</p>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Apod