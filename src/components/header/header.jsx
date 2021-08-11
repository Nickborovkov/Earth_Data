import React from "react";
import s from './header.module.css'
import SearchForm from "./searchForm/searchForm";
import mainIcon from '../../images/mainIcon.png'

const Header = () => {
    return (
        <header className ={s.header}>
            <img className={s.logo} src={mainIcon} alt="mainIcon"/>
            <h1 className ={s.title}>Earth Data</h1>
            <SearchForm />
        </header>
    )
}

export default Header