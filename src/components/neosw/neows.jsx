import React, {useEffect} from "react";
import s from './neows.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getNeows} from "../../reducers/neows";
import Preloader from "../../helpers/preloader";
import SetIntervalNEOWS from "./datePickers/SetIntervalNEOWS";

const Neows = () => {

    const dispatch = useDispatch()
    const neowsArray = useSelector(state => state.neows.neowsArray)
    const intervalDateStart = useSelector(state => state.neows.intervalDateStart)
    const intervalDateEnd = useSelector(state => state.neows.intervalDateEnd)


    useEffect(() => {
        dispatch(getNeows(intervalDateStart, intervalDateEnd))
    }, [dispatch, intervalDateStart, intervalDateEnd])


    if (neowsArray.length === 0) return <Preloader/>

    return (
        <div>
            <h2>Near Earth Object Web Service</h2>
            <SetIntervalNEOWS />
            {
                <div>
                    {
                        Object.keys(neowsArray).map(key => <div key={key}>
                            <h3 className={s.date}>Date: {key}</h3>
                            {
                                neowsArray[key].map(v => <div className={s.asteroid} key={v.id}>
                                    <p className={s.name}>Asteroid name: {v.name}</p>
                                    <div>
                                        <p className={s.diameter}>Diameter</p>
                                        <p>From {v.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} meters</p>
                                        <p>To {v.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} meters</p>
                                    </div>
                                    <div>
                                        <p className={s.danger}>Is potentially hazardous?</p>
                                    </div>
                                    <p>{!v.is_potentially_hazardous_asteroid ? `No` : `Yes`}</p>

                                </div>)
                            }
                        </div>)
                    }
                </div>
            }
        </div>
    )
}

export default Neows