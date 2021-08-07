import React, {useEffect} from "react";
import s from './earthImage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getEarthImage} from "../../reducers/earthImage";
import Preloader from "../../helpers/preloader";

const EarthImage = () => {

    const earthImage = useSelector(state => state.earthImage.earthImage)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEarthImage)
    }, [])

    let year = `2020`
    let month = `08`
    let day = `07`

    if(!earthImage) return <Preloader />

    return (
        <div>
            <h2>See dated Earth Image</h2>
            <div>
                {
                    earthImage.map(e => <div key={e.identifier}>
                        <div>
                            <h3>Coordinates of {e.identifier}</h3>
                            <p>Latitude {e.centroid_coordinates.lat}</p>
                            <p>Longitude {e.centroid_coordinates.lon}</p>
                        </div>
                        <img className={s.image} src={`https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/png/${e.image}.png?api_key=DEMO_KEY`}
                             alt="earthImage"/>
                    </div>)
                }
            </div>
        </div>
    )
}

export default EarthImage