import React, {useEffect} from "react";
import s from './earthImage.module.css'
import m from './earthImageMedia.module.css'
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {getEarthImage} from "../../reducers/earthImage";
import Preloader from "../../helpers/preloaders/preloader";
import SetDateEarthImage from "./datePicker/setDateEarthImage";
import {earthImageUrlHelper} from "../../helpers/earthImageURLHelper";
import {Redirect} from "react-router-dom";

const EarthImage = () => {

    const dispatch = useDispatch()
    const earthImage = useSelector(state => state.earthImage.earthImage)
    const SelectedDate = useSelector(state => state.earthImage.date)
    const searchStart = useSelector(state => state.library.searchStart)

    useEffect(() => {
        dispatch(getEarthImage(SelectedDate))
    }, [dispatch, SelectedDate])



    if(!earthImage) return <Preloader />

    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.earthImage}>
            <h2 className={cn(s.title, m.title)}>See photos of Earth from space</h2>
            <SetDateEarthImage />
            <div className={s.imagesArray}>
                    {
                        earthImage.map(e => <div key={e.identifier} className={cn(s.imagesItem, m.imagesItem)}>
                            <div>
                                <h3 className={s.imageDate}>Date: {e.date}</h3>
                                <p className={s.params}>Latitude: {e.centroid_coordinates.lat}</p>
                                <p className={s.params}>Longitude: {e.centroid_coordinates.lon}</p>
                            </div>
                            <div className={s.imageHolder}>
                                <img className={s.image} src={earthImageUrlHelper(SelectedDate, e.image)}
                                     alt="Not available, please change date"/>
                            </div>
                        </div>)
                    }
            </div>
        </div>
    )
}

export default EarthImage