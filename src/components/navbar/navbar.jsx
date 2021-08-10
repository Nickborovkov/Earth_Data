import React from "react";
import s from './navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={s.navbar}>
            <nav className={s.menu}>
                <NavLink className={s.link}
                         activeClassName={s.linkActive}
                         to='/apod'>Picture of the day</NavLink>
                <NavLink className={s.link}
                         activeClassName={s.linkActive}
                         to='/neows'>Near Earth Asteroids</NavLink>
                <NavLink className={s.link}
                         activeClassName={s.linkActive}
                         to='/earth'>Earth Observation</NavLink>
                <NavLink className={s.link}
                         activeClassName={s.linkActive}
                         to='/earthImage'>Satellite Earth Photos</NavLink>
                <NavLink className={s.link}
                         activeClassName={s.linkActive}
                         to='/marsRover'>Mars Rover Photos</NavLink>
            </nav>
        </div>
    )
}

export default Navbar