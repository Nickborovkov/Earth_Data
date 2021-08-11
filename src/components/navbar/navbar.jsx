import React, {useState} from "react";
import s from './navbar.module.css'
import m from './navbarMedia.module.css'
import cn from 'classnames'
import {NavLink} from "react-router-dom";
import { BiMenuAltLeft } from 'react-icons/bi'

const Navbar = () => {

    const [burgerMenu, setBurgerMenu] = useState(false)

    const toggleMenu = () => {
        if(!burgerMenu){
            setBurgerMenu(true)
        }else {
            setBurgerMenu(false)
        }
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
            <div className={cn(s.burger, m.burger)}
                 onClick={toggleMenu}><BiMenuAltLeft/></div>
        </div>
    )
}

export default Navbar