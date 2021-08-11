import React from "react";
import s from './helpers.module.css'
import m from './helpersMedia.module.css'
import cn from 'classnames'
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const Page404 = () => {

    const searchStart = useSelector(state => state.library.searchStart)

    if(searchStart) return <Redirect to='/nasaLibrary'/>

    return (
        <div className={cn(s.page404, m.page404)}>
            <h1 className={s.page404Title}>Error</h1>
            <p className={s.page404Subtitle}>Results not found</p>
        </div>
    )
}

export default Page404