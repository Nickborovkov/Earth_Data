import React, {useEffect} from "react";
import s from './earthImage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getEarthImage} from "../../reducers/earthImage";
import Preloader from "../../helpers/preloader";
import SetDateEarthImage from "./datePicker/setDateEarthImage";
import {earthImageUrlHelper} from "../../helpers/earthImageURLHelper";

const EarthImage = () => {

    const dispatch = useDispatch()
    const earthImage = useSelector(state => state.earthImage.earthImage)
    const SelectedDate = useSelector(state => state.earthImage.date)

    useEffect(() => {
        dispatch(getEarthImage(SelectedDate))
    }, [dispatch, SelectedDate])



    if(!earthImage) return <Preloader />

    return (
        <div>
            <h2>See dated Earth Image</h2>
            <SetDateEarthImage />
            <div>
                {
                    earthImage.map(e => <div key={e.identifier}>
                        <div>
                            <h3>Coordinates of {e.identifier}</h3>
                            <p>Latitude {e.centroid_coordinates.lat}</p>
                            <p>Longitude {e.centroid_coordinates.lon}</p>
                        </div>
                        <img className={s.image} src={earthImageUrlHelper(SelectedDate, e.image)}
                             alt="Not available, please change date"/>
                    </div>)
                }
            </div>
        </div>
    )
}

export default EarthImage