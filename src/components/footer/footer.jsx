import React from "react";
import s from './footer.module.css'
import m from './footerMedia.module.css'
import cn from 'classnames'
import { BiCopyright } from 'react-icons/bi';
import nasaLogo from '../../assets/images/nasaLogo.png'

const Footer = () => {
    return (
        <div className={cn(s.footer, m.footer)}>
            <a className={cn(s.footerLink, m.footerLink)}
               href="https://api.nasa.gov/index.html#browseAPI"
               target='blank'><div className={cn(s.apiLink, m.apiLink)}>
                API provided by NASA open API
                <img className={cn(s.logo, m.logo)} src={nasaLogo} alt="nasaLogo"/>
            </div>
                </a>
            <a className={cn(s.footerAuthor, m.footerAuthor)}
               href={"https://github.com/Nickborovkov"}
               target='blank'><BiCopyright /> Made by Nick Borovkov</a>
        </div>
    )
}
export default Footer
