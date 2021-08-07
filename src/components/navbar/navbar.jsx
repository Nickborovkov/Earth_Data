import React from "react";
import s from './navbar.module.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={s.navbar}>
            <NavLink className={s.link}
                     activeClassName={s.linkActive}
                     to='/apod'>A picture of the day</NavLink>
            <NavLink className={s.link}
                     activeClassName={s.linkActive}
                     to='/neows'>Near Earth Asteroids</NavLink>
            <NavLink className={s.link}
                     activeClassName={s.linkActive}
                     to='/earth'>Earth Observation Data</NavLink>
            <NavLink className={s.link}
                     activeClassName={s.linkActive}
                     to='/earthImage'>See Earth Image</NavLink>
            <NavLink className={s.link}
                     activeClassName={s.linkActive}
                     to='/marsRover'>Mars Rover Photos</NavLink>
        </div>
    )
}

export default Navbar