import React from "react";
import s from './startPage.module.css'
import m from './startPageMedia.module.css'
import cn from 'classnames'
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const StartedPage = () => {

    const searchStart = useSelector(state => state.library.searchStart)

    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={cn(s.starterPage, m.starterPage)}>
            <div className={s.starterPageHolder}>
                <h1 className={cn(s.starterTitle, m.starterTitle)}>This App shows Earth data collected by NASA</h1>
                <p className={cn(s.starterSubtitle, m.starterSubtitle)}>Results may take some time to load due to long server response, please be patient</p>
                <p className={cn(s.starterSubtitle, m.starterSubtitle)}>Made by Nick Borovkov</p>
            </div>
        </div>
    )
}

export default StartedPage
