import React, {useEffect, useState} from "react";
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

    const [hints, setHints] = useState(false)

    if(marsRoverPhotos.length === 0) return <Preloader />

    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={s.marsRover}>
           <h1 className={cn(s.title, m.title)}>Look for photos that Mars rovers Spirit, Curiosity and Opportunity make</h1>

            {hints &&
            <div className={cn(s.hintBody, m.hintBody)}>
                <button className={s.hintButton}
                        onClick={ () => {setHints(false)} }>Hide dates</button>
                <div className={s.hintInner}>
                    <div className={s.titleHolder}>
                        <h5 className={s.hintTitle}>Spirit</h5>
                        <p className={s.hintDate}>2004-01-05 - 2010-03-14</p>
                    </div>
                    <div className={s.titleHolder}>
                        <h5 className={s.hintTitle}>Opportunity</h5>
                        <p className={s.hintDate}>2004-01-26 - today</p>
                    </div>
                    <div className={s.titleHolder}>
                        <h5 className={s.hintTitle}>Curiosity</h5>
                        <p className={s.hintDate}>2012-08-06 - today</p>
                    </div>
                </div>

            </div>}
            {!hints &&
            <div className={cn(s.hintBodySmall, m.hintBodySmall)}>
                <button className={s.hintButton}
                        onClick={ () => {setHints(true)}} >Show possible dates</button>
            </div>}


            <MarsRoverParams />
            <div className={s.items}>
                {
                    marsRoverPhotos.map(r => <div className={cn(s.item, m.item)} key={r.id}>
                        <p className={s.params}>Rover: {r.rover.name}</p>
                        <p className={s.params}>Status: {r.rover.status}</p>
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