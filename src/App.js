import './App.css';
import React from "react";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";
import {Route, Switch} from "react-router-dom";
import Apod from "./components/apod/apod";
import Neows from "./components/neosw/neows";
import Earth from "./components/earth/earth";
import EarthImage from "./components/earthImage/earthImage";
import Footer from "./components/footer/footer";
import MarsRover from "./components/marsRover/marsRover";

let App = () => {
    return (
        <div className='appWrapper'>
            <Header />
            <div className='appInner'>
                <Navbar />
                <div className='appContent'>
                    <Switch>
                        <Route path='/apod'
                               render={ () => <Apod /> }/>
                        <Route path='/neows'
                               render={ () => <Neows /> }/>
                        <Route path='/earth'
                               render={ () => <Earth /> }/>
                        <Route path='/earthImage'
                               render={ () => <EarthImage /> }/>
                        <Route path='/marsRover'
                               render={ () => <MarsRover /> }/>
                    </Switch>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default App