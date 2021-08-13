import React, {useState} from "react";
import s from './navbar.module.css'
import m from './navbarMedia.module.css'
import cn from 'classnames'
import {NavLink} from "react-router-dom";
import { RiHome2Line } from 'react-icons/ri'


const Navbar = () => {

    const [burgerMenu, setBurgerMenu] = useState(false)

    const toggleMenu = () => {
        !burgerMenu
            ? setBurgerMenu(true)
            : setBurgerMenu(false)
    }

    return (
        <div className={cn(s.navbar, m.navbar, burgerMenu && m.navbarActive)}>
            <nav className={cn(s.menu, m.menu)}>
                <NavLink className={cn(s.link, m.link)}
                         activeClassName={cn(s.linkActive, m.linkActive)}
                         to='/apod'
                         onClick={()=>{setBurgerMenu(false)}}>Picture of the day</NavLink>
                <NavLink className={cn(s.link, m.link)}
                         activeClassName={cn(s.linkActive, m.linkActive)}
                         to='/neows'
                         onClick={()=>{setBurgerMenu(false)}}>Near Earth Asteroids</NavLink>
                <NavLink className={cn(s.link, m.link)}
                         activeClassName={cn(s.linkActive, m.linkActive)}
                         to='/earth'
                         onClick={()=>{setBurgerMenu(false)}}>Earth Observation</NavLink>
                <NavLink className={cn(s.link, m.link)}
                         activeClassName={cn(s.linkActive, m.linkActive)}
                         to='/earthImage'
                         onClick={()=>{setBurgerMenu(false)}}>Satellite Earth Photos</NavLink>
                <NavLink className={cn(s.link, m.link)}
                         activeClassName={cn(s.linkActive, m.linkActive)}
                         to='/marsRover'
                         onClick={()=>{setBurgerMenu(false)}}>Mars Rover Photos</NavLink>
            </nav>
            <div className={cn(s.menuButtons, m.menuButtons)}>
            <NavLink className={s.menuButton}
                     to='/'><RiHome2Line/></NavLink>
            <div className={s.menuButton}
                    onClick={toggleMenu}>
                <div className={cn(s.burgerLine, m.burgerLine)}></div>
                <div className={cn(s.burgerLine, m.burgerLine)}></div>
                <div className={cn(s.burgerLine, m.burgerLine)}></div>
            </div>
                <div className={cn(s.burgerText, m.burgerText)}>menu</div>
            </div>
        </div>
    )
}

export default Navbar