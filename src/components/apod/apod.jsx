import React, {useEffect, useState} from "react";
import s from './apod.module.css'
import m from './apodMedia.module.css'
import common from '../../helpers/commonStyles/commonStyles.module.css'
import form from '../../helpers/formHelpers/formsStyles.module.css'
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {getApod, getApodWithInterval} from "../../reducers/apod";
import Preloader from "../../helpers/preloaders/preloader";
import SetDateAPOD from "./datePickersAPOD/setDateAPOD";
import SetIntervalAPOD from "./datePickersAPOD/setIntervalAPOD";
import {Redirect} from "react-router-dom";
import {setNewError} from "../../reducers/errors";
import imagePlaceHolder from '../../images/imagePlaceholder.jpg'
import Lazyload from 'react-lazyload'
import ModalWindow from "../../helpers/modalWindow/modalWindow";

const Apod = () => {

    const dispatch = useDispatch()
    const apodArray = useSelector(state => state.apod.apodArray)
    const currentDate = useSelector(state => state.apod.currentDate)
    const intervalDateStart = useSelector(state => state.apod.intervalDateStart)
    const intervalDateEnd = useSelector(state => state.apod.intervalDateEnd)
    const searchStart = useSelector(state => state.library.searchStart)
    const error = useSelector(state => state.errors.error)

    const [datePickerType, setDatePickerType] = useState(0)
    const [modalWindow, setModalWindow] = useState(false)
    const [modalSrc, setModalSrc] = useState(``)

    const [params, setParams] = useState(false)
    const setParameters = () => {
        params
            ? setParams(false)
            : setParams(true)
    }

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

    useEffect(()=>{
        dispatch(setNewError(null))
    },[dispatch])


    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.apod}>
           <h2 className={common.title}>NASA Picture Of The Day</h2>

            {!params &&
            <button className={form.formOpenButton} onClick={setParameters}>Set parameters</button>}

            {params && <div>
                <button className={form.formOpenButton} onClick={setParameters}>Close parameters</button>
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


            {error && <h3 className={common.errorCase}>Not available, please change date</h3>}

            {apodArray.length === 0 && !error &&
            <Preloader/>}

            {apodArray.length !== 0 && !error &&
            <div className={s.apodList}>
                {
                    apodArray.map(a => <div className={cn(s.apodItem, m.apodItem)} key={a.date}>
                        <Lazyload height={300}>
                            <div>
                                <h3 className={cn(s.apodTitle, m.apodTitle)}>{a.title}</h3>
                                <div className={s.apodImageHolder}>
                                    <img className={s.apodImage}
                                         src={a.url}
                                         alt="apod"
                                         onClick={ (e) => {
                                             setModalWindow(true)
                                             setModalSrc(e.currentTarget.src)
                                         }}
                                         onError={ (e) => {e.target.src = imagePlaceHolder}}/>
                                </div>
                                <p className={cn(s.apodDate, m.apodDate)}>Date: {a.date}</p>
                                <p className={cn(s.apodExpTitle, m.apodExpTitle)}>Explanation</p>
                                <p className={cn(s.apodExplanation, m.apodExplanation)}>
                                    {a.explanation || `Explanation not available`}</p>
                            </div>
                        </Lazyload>
                    </div>)
                }

                {modalWindow &&
                <ModalWindow active={modalWindow} setActive={setModalWindow}>
                    <img className={cn(common.modalImage)}
                         src={modalSrc}
                         alt="modal"/>
                </ModalWindow>}

            </div>}

        </div>
    )
}

export default Apod