import React from "react";
import s from './footer.module.css'
import { BiCopyright } from 'react-icons/bi';
import { AiOutlineLink } from 'react-icons/ai';

const Footer = () => {
    return (
        <div className={s.footer}>
            <a className={s.footerLink}
               href="https://api.nasa.gov/index.html#browseAPI"
               target='blank'>API provided by NASA open API <AiOutlineLink/></a>
            <a className={s.footerAuthor}
               href={"https://github.com/Nickborovkov"}
               target='blank'><BiCopyright /> Made by Nick Borovkov</a>
        </div>
    )
}
export default Footer