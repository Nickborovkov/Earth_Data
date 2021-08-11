import React from "react"
import { BiLoaderCircle } from 'react-icons/bi'
import s from './preloader.module.css'

const Preloader = () => {
    return (
        <div className={s.preloader}>
            <BiLoaderCircle className={s.icon}/>
        </div>
    )
}

export default Preloader