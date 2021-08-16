import React, {useEffect} from "react";
import s from './earthImage.module.css'
import m from './earthImageMedia.module.css'
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {getEarthImage} from "../../reducers/earthImage";
import Preloader from "../../helpers/preloaders/preloader";
import SetDateEarthImage from "./datePicker/setDateEarthImage";
import {Redirect} from "react-router-dom";
import {earthImageUrlHelper} from "../../helpers/urlHelper/earthImageURLHelper";
import {setNewError} from "../../reducers/errors";
import imagePlaceHolder from "../../images/imagePlaceholder.jpg";
import Lazyload from 'react-lazyload'

const EarthImage = () => {

    const dispatch = useDispatch()
    const earthImage = useSelector(state => state.earthImage.earthImage)
    const SelectedDate = useSelector(state => state.earthImage.date)
    const searchStart = useSelector(state => state.library.searchStart)
    const error = useSelector(state => state.errors.error)

    useEffect(() => {
        dispatch(getEarthImage(SelectedDate))
    }, [dispatch, SelectedDate])

    useEffect(()=>{
        dispatch(setNewError(null))
    },[dispatch])

    if(!earthImage) return <Preloader />

    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.earthImage}>
            <h2 className={cn(s.title, m.title)}>Earth Polychromatic Imaging Camera Photos</h2>
            <SetDateEarthImage />

            {!earthImage && !error &&
            <Preloader/>}

            {earthImage !== 0 && !error &&
            <div className={s.imagesArray}>
                {
                    earthImage.map(e => <div key={e.identifier} className={cn(s.imagesItem, m.imagesItem)}>
                        <Lazyload height={100}>
                            <div>
                                <div>
                                    <h3 className={s.imageDate}>Date: {e.date}</h3>
                                    <p className={s.params}>Latitude: {e.centroid_coordinates.lat}</p>
                                    <p className={s.params}>Longitude: {e.centroid_coordinates.lon}</p>
                                </div>
                                <div className={s.imageHolder}>
                                    <img className={s.image}
                                         src={earthImageUrlHelper(SelectedDate, e.image)}
                                         alt="earthImage"
                                         onError={ (e) => {e.target.src = imagePlaceHolder}}/>
                                </div>
                            </div>
                        </Lazyload>

                    </div>)
                }
            </div>}
        </div>
    )
}

export default EarthImage