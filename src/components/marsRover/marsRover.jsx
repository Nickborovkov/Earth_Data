import React, {useEffect} from "react";
import s from './marsRover.module.css'
import m from './marsRoverMedia.module.css'
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import {getMarsRoverPhotos, roverNextPage, roverPrevPage} from "../../reducers/marsRover";
import Preloader from "../../helpers/preloaders/preloader";
import MarsRoverParams from "./parametersPicker/parametersPicker";
import {Redirect} from "react-router-dom";
import { MdNavigateBefore } from 'react-icons/md';
import { MdNavigateNext } from 'react-icons/md';

const MarsRover = () => {

    const dispatch = useDispatch()
    const marsRoverPhotos = useSelector(state => state.marsRover.marsRoverPhotos)
    const rover = useSelector(state => state.marsRover.rover)
    const date = useSelector(state => state.marsRover.date)
    const page = useSelector(state => state.marsRover.page)
    const searchStart = useSelector(state => state.library.searchStart)

    useEffect(()=>{
        dispatch(getMarsRoverPhotos(rover, date, page))
    },[dispatch, rover, date, page])

    if(marsRoverPhotos.length === 0) return <Preloader />

    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.marsRover}>
           <h1 className={cn(s.title, m.title)}>Photos collection gathered by NASA's Curiosity, Opportunity, and Spirit rovers on Mars</h1>
            <MarsRoverParams />
            <div className={s.items}>
                {
                    marsRoverPhotos.map(r => <div className={cn(s.item, m.item)} key={r.id}>
                        <p className={s.params}>Camera name: {r.camera.full_name}</p>
                        <p className={s.params}>Earth date: {r.earth_date}</p>
                        <div className={s.imageHolder}>
                            <img className={s.image} src={r.img_src} alt="roverPhoto"/>
                        </div>

                    </div>)
                }
            </div>
            <div className={s.buttonsHolder}>
                {
                    page > 1 &&
                    <button className={s.pageButton}
                            onClick={ () => {dispatch(roverPrevPage())} }>
                        <MdNavigateBefore/>
                    </button>
                }

                <button className={s.pageButton}
                        onClick={ () => {dispatch(roverNextPage())} }>
                    <MdNavigateNext />
                </button>
            </div>
        </div>
    )
}

export default MarsRover