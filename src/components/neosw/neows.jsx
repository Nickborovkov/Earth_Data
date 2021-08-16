import React, {useEffect} from "react";
import s from './neows.module.css'
import m from './neowsMedia.module.css'
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {getNeows} from "../../reducers/neows";
import Preloader from "../../helpers/preloaders/preloader";
import SetIntervalNEOWS from "./datePickers/SetIntervalNEOWS";
import {Redirect} from "react-router-dom";
import {setNewError} from "../../reducers/errors";
import Lazyload from 'react-lazyload'

const Neows = () => {

    const dispatch = useDispatch()
    const neowsArray = useSelector(state => state.neows.neowsArray)
    const intervalDateStart = useSelector(state => state.neows.intervalDateStart)
    const intervalDateEnd = useSelector(state => state.neows.intervalDateEnd)
    const searchStart = useSelector(state => state.library.searchStart)
    const error = useSelector(state => state.errors.error)


    useEffect(() => {
        dispatch(getNeows(intervalDateStart, intervalDateEnd))
    }, [dispatch, intervalDateStart, intervalDateEnd])

    useEffect(()=>{
        dispatch(setNewError(null))
    },[dispatch])


    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.neows}>
            <h2 className={cn(s.title, m.title)}>List of Asteroids based on their closest approach date to Earth</h2>

            <SetIntervalNEOWS />

            {neowsArray.length === 0 && !error &&
            <Preloader/>}

            {neowsArray.length !== 0 && !error &&
            <div>
                {
                    Object.keys(neowsArray).map(key => <div key={key}>
                        <h3 className={s.date}>Date: {key}</h3>
                        <div className={s.asteroidsArray}>
                            {
                                neowsArray[key].map(v => <div className={s.asteroid} key={v.id}>
                                    <Lazyload>
                                        <div>
                                            <p className={s.name}>Asteroid name: {v.name}</p>
                                            <div className={s.diam}>
                                                <p className={s.diameter}>Diameter:</p>
                                                <p className={s.diameterEpx}>From {v.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} meters</p>
                                                <p className={s.diameterEpx}>To {v.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} meters</p>
                                            </div>
                                            <div>
                                                <p className={s.danger}>
                                                    Potentially hazardous? -
                                                    {
                                                        !v.is_potentially_hazardous_asteroid
                                                            ? <span> No</span>
                                                            : <span className={s.hazardExp}> Yes</span>
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </Lazyload>

                                </div>)
                            }
                        </div>

                    </div>)
                }
            </div>
            }
        </div>
    )
}

export default Neows