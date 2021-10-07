import React, {memo, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import s from './neows.module.css'
import common from '../../helpers/commonStyles/commonStyles.module.css'
import form from '../../helpers/formHelpers/formsStyles.module.css'
import Preloader from "../common/preloaders/preloader";
import DatePickerNEOWS from "./datePickerNEOWS/datePickerNEOWS";
import NeowsItem from "./neowsItem/neowsItem";
import {useDispatch, useSelector} from "react-redux";
import {getNeows} from "../../store/neowsReducer";
import {setNewError} from "../../store/commonReducer";
import { GiClick } from 'react-icons/gi';

const Neows = memo(() => {

    //State
    const dispatch = useDispatch()

    const neowsArray = useSelector(state => state.neows.neowsArray)
    const intervalDateStart = useSelector(state => state.neows.intervalDateStart)
    const intervalDateEnd = useSelector(state => state.neows.intervalDateEnd)
    const searchStart = useSelector(state => state.library.searchStart)
    const isFetching = useSelector(state => state.common.isFetching)
    const error = useSelector(state => state.common.error)

    //Open/close parameters
    const [params, setParams] = useState(false)
    const setParameters = () => {
        params
            ? setParams(false)
            : setParams(true)
    }

    //Setting items
    useEffect(() => {
        dispatch(getNeows(intervalDateStart, intervalDateEnd))
    }, [dispatch, intervalDateStart, intervalDateEnd])

    //Error = null when page loads
    useEffect(()=>{
        dispatch(setNewError(null))
    },[dispatch])

    //Redirect to nasaLibrary when submit search field if header
    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.neows}>
            <h2 className={common.title}>List of Asteroids based on their closest approach date to Earth</h2>

            {/*Parameters section*/}
            {!params &&
            <button className={form.formOpenButton}
                    onClick={setParameters}><GiClick/> Set parameters</button>}

            {params && <div>
                <button className={form.formOpenButton}
                        onClick={setParameters}><GiClick/> Close parameters</button>
                <DatePickerNEOWS setParams={setParams}/>
            </div>}

            {/*Error case*/}
            {error && <h3 className={common.errorCase}>Not available, please change date interval</h3>}

            {/*Preloader*/}
            {isFetching && !error &&
            <Preloader/>}

            {/*Result*/}
            {!isFetching && !error &&
            <div>
                {
                    Object.keys(neowsArray).map(key => <div key={key}>
                        <h3 className={s.date}>Date: {key}</h3>
                        <div className={s.asteroidsArray}>
                            {
                                neowsArray[key].map(v => <NeowsItem key={v.id}
                                                                    item={v}/>)
                            }
                        </div>

                    </div>)
                }
            </div>
            }
        </div>
    )
})

export default Neows
