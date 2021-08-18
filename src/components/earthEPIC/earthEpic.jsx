import React, {useEffect, useState} from "react";
import s from './earthEpic.module.css'
import m from './earthEpicMedia.module.css'
import common from '../../helpers/commonStyles/commonStyles.module.css'
import form from '../../helpers/formHelpers/formsStyles.module.css'
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {getEarthImage} from "../../reducers/earthEpic";
import Preloader from "../../helpers/preloaders/preloader";
import DatePickerEpic from "./datePickerEPIC/datePickerEpic";
import {Redirect} from "react-router-dom";
import {earthEpicURLHelper} from "../../helpers/urlHelper/earthEpicURLHelper";
import {setNewError} from "../../reducers/errors";
import imagePlaceHolder from "../../images/imagePlaceholder.jpg";
import Lazyload from 'react-lazyload'
import ModalWindow from "../../helpers/modalWindow/modalWindow";

const EarthEpic = () => {
    const dispatch = useDispatch()
    const earthImage = useSelector(state => state.earthImage.earthImage)
    const SelectedDate = useSelector(state => state.earthImage.date)
    const searchStart = useSelector(state => state.library.searchStart)
    const error = useSelector(state => state.errors.error)

    const [modalWindow, setModalWindow] = useState(false)
    const [modalSrc, setModalSrc] = useState(``)

    const [params, setParams] = useState(false)
    const setParameters = () => {
        params
            ? setParams(false)
            : setParams(true)
    }

    useEffect(() => {
        dispatch(getEarthImage(SelectedDate))
    }, [dispatch, SelectedDate])

    useEffect(()=>{
        dispatch(setNewError(null))
    },[dispatch])


    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.earthImage}>
            <h2 className={common.title}>Earth Polychromatic Imaging Camera Photos</h2>

            {!params &&
            <button className={form.formOpenButton} onClick={setParameters}>Set parameters</button>}

            {params && <div>
                <button className={form.formOpenButton} onClick={setParameters}>Close parameters</button>
                <DatePickerEpic setParams={setParams}/>
            </div>}

            {error && <h3 className={common.errorCase}>Not available, please change date</h3>}

            {!earthImage && !error &&
            <Preloader/>}

            {earthImage && !error &&
            <div className={s.imagesArray}>
                {
                    earthImage.map(e => <div key={e.identifier} className={cn(s.imagesItem, m.imagesItem)}>
                        <Lazyload height={300}>
                            <div>
                                <div>
                                    <h3 className={s.imageDate}>Date: {e.date}</h3>
                                    <p className={s.params}>Latitude: {e.centroid_coordinates.lat}</p>
                                    <p className={s.params}>Longitude: {e.centroid_coordinates.lon}</p>
                                </div>
                                <div className={s.imageHolder}>
                                    <img className={s.image}
                                         src={earthEpicURLHelper(SelectedDate, e.image)}
                                         alt="earthImage"
                                         onClick={ (e) => {
                                             setModalWindow(true)
                                             setModalSrc(e.currentTarget.src)
                                         }}
                                         onError={ (e) => {e.target.src = imagePlaceHolder}}/>
                                </div>
                            </div>
                        </Lazyload>
                    </div>)
                }

                {modalWindow &&
                <ModalWindow active={modalWindow} setActive={setModalWindow}>
                    <img className={cn(common.modalImage)}
                         src={modalSrc}
                         alt="modal"/>
                </ModalWindow>}

            </div>}
        </div>
    )
}

export default EarthEpic