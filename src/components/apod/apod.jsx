import React, {useEffect} from "react";
import s from './apod.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getApod} from "../../reducers/apod";
import Preloader from "../../helpers/preloader";

const Apod = () => {

    const dispatch = useDispatch()
    const apodArray = useSelector(state => state.apod.apodArray)

    useEffect(()=>{
        dispatch(getApod)
    },[])


    if(apodArray.length === 0) return <Preloader />

    return (
        <div>
           <h2>A picture of the day</h2>
            <div>
                {
                    apodArray.map(a => <div key={apodArray.length + 1}>
                        <h3>{a.title}</h3>
                        <img className={s.image} src={a.url} alt="apod"/>
                        <p>{a.date}</p>
                        <p>{a.explanation}</p>


                    </div>)
                }
            </div>
        </div>
    )
}

export default Apod