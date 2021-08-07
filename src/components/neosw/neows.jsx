import React, {useEffect} from "react";
import s from './neows.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getNeows} from "../../reducers/neows";
import Preloader from "../../helpers/preloader";

const Neows = () => {

    const dispatch = useDispatch()
    const neowsArray = useSelector(state => state.neows.neowsArray)

    //const tempObj = Object.values(neowsArray[0])[0]
    useEffect(()=>{
        dispatch(getNeows)
    },[])

    if(neowsArray.length === 0) return <Preloader />


    return (
        <div>
            <h2>Near Earth Object Web Service</h2>

            <div>
                {
                    neowsArray.map(n => <div className={s.asteroid} key={n.id}>
                        <h3>{n.name}</h3>
                        <p>{n.id}</p>
                        <p>{!n.is_potentially_hazardous_asteroid ? `Not hazardous` : `Potentially hazardous`}</p>
                        <div>
                            <h4>Estimated diameter</h4>
                            <p>From {n.estimated_diameter.meters.estimated_diameter_min.toFixed(2)} meters</p>
                            <p>To {n.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} meters</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Neows