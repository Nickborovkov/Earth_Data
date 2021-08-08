import React, {useEffect, useState} from "react";
import s from './apod.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getApod, getApodWithInterval} from "../../reducers/apod";
import Preloader from "../../helpers/preloader";
import ChooseExactDate from "./chooseExactDate";
import ChooseDateInterval from "./chooseDateInterval";

const Apod = () => {

    const dispatch = useDispatch()
    const apodArray = useSelector(state => state.apod.apodArray)
    const currentDate = useSelector(state => state.apod.currentDate)
    const intervalDateStart = useSelector(state => state.apod.intervalDateStart)
    const intervalDateEnd = useSelector(state => state.apod.intervalDateEnd)


    useEffect(()=>{
        if(datePickerType === 0){
            dispatch(getApod(currentDate))
        }
    },[dispatch, currentDate])

    useEffect(()=>{
        if(datePickerType === 1){
            dispatch(getApodWithInterval(intervalDateStart,intervalDateEnd))
        }
    },[dispatch, intervalDateStart, intervalDateEnd])

    const [datePickerType, setDatePickerType] = useState(0)

    if(apodArray.length === 0) return <Preloader />

    return (
        <div>
           <h2>A picture of the day</h2>
            {datePickerType === 0 &&
            <div>
                <ChooseExactDate />
                <button onClick={ () => {setDatePickerType(1)} }>Choose interval</button>
            </div>}

            {datePickerType === 1 &&
            <div>
                <ChooseDateInterval />
                <button onClick={ () => {setDatePickerType(0)} }>Choose exact date</button>
            </div>}

            <div>
                {
                    apodArray.map(a => <div key={a.date}>
                        <h3>{a.title}</h3>
                        <img className={s.image} src={a.url} alt="Sorry, image is not available"/>
                        <p>{a.date}</p>
                        <p>{a.explanation}</p>


                    </div>)
                }
            </div>
        </div>
    )
}

export default Apod