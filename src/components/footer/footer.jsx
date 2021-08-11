import React from "react";
import s from './footer.module.css'
import { BiCopyright } from 'react-icons/bi';
import nasaLogo from '../../images/nasaLogo.png'

const Footer = () => {
    return (
        <div className={s.footer}>
            <a className={s.footerLink}
               href="https://api.nasa.gov/index.html#browseAPI"
               target='blank'><div className={s.apiLink}>
                API provided by NASA open API
                <img className={s.logo} src={nasaLogo} alt="nasaLogo"/>
            </div>
                </a>
            <a className={s.footerAuthor}
               href={"https://github.com/Nickborovkov"}
               target='blank'><BiCopyright /> Made by Nick Borovkov</a>
        </div>
    )
}
export default Footer