import React, {useEffect} from "react";
import s from './marsRover.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getMarsRoverPhotos} from "../../reducers/marsRover";
import Preloader from "../../helpers/preloader";
import MarsRoverParams from "./parametersPicker/parametersPicker";

const MarsRover = () => {

    const dispatch = useDispatch()
    const marsRoverPhotos = useSelector(state => state.marsRover.marsRoverPhotos)
    const rover = useSelector(state => state.marsRover.rover)
    const date = useSelector(state => state.marsRover.date)

    useEffect(()=>{
        dispatch(getMarsRoverPhotos(rover, date))
    },[dispatch, rover, date])

    if(marsRoverPhotos.length === 0) return <Preloader />

    return (
        <div>
           <h1>Photos collection gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars</h1>
            <MarsRoverParams />
            <div>
                {
                    marsRoverPhotos.map(r => <div key={r.id}>
                        <img className={s.image} src={r.img_src} alt="roverPhoto"/>
                        <p>{r.camera.full_name}</p>
                        <p>Earth date</p>
                        <p>{r.earth_date}</p>
                    </div>)
                }
            </div>
        </div>
    )
}

export default MarsRover