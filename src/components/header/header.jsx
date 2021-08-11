import React from "react";
import s from './header.module.css'
import m from './headerMedia.module.css'
import cn from 'classnames'
import SearchForm from "./searchForm/searchForm";
import mainIcon from '../../images/nasaLogo.png'

const Header = () => {
    return (
        <header className ={cn(s.header, m.header)}>
            <div className={cn(s.headerInner, m.headerInner)}>
                <img className={cn(s.logo, m.logo)} src={mainIcon} alt="mainIcon"/>
                <h1 className ={cn(s.title, m.title)}>Earth Data</h1>
            </div>
            <SearchForm />
        </header>
    )
}

export default Header