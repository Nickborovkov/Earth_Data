import React from "react"
import { BiLoaderCircle } from 'react-icons/bi'
import s from './preloader.module.css'

const Preloader = () => {
    return (
        <div className={s.preloader}>
           <h1 className={s.title}>Loading, please wait...</h1>
            <BiLoaderCircle className={s.icon}/>
        </div>
    )
}

export default Preloader