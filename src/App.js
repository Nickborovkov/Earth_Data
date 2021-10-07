import './App.css';
import React, {Suspense, lazy, useState, useEffect} from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import {Route, Switch} from "react-router-dom";
import StartedPage from "./components/common/startPage/startedPage";
import Page404 from "./components/common/errorPage/page404";
import Preloader from "./components/common/preloaders/preloader";
import { BiArrowToTop } from 'react-icons/bi';
const Apod = lazy( () => import("./components/apod/apod"))
const Neows = lazy( () => import("./components/neosw/neows" ))
const Earth = lazy( () =>  import("./components/earthObs/earthObs"))
const EarthImage = lazy( () => import("./components/earthEPIC/earthEpic"))
const MarsRover = lazy( () =>  import("./components/marsRover/marsRover"))
const NasaLibrary = lazy( () => import("./components/NASAlibrary/nasaLibrary") )


let App = () => {

    //Scroll to top button
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener(`scroll`, () => {
            if (window.pageYOffset > 1100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    return (
        <div className='appWrapper'>
            <Header />
            <div className='appInner'>
                <Navbar />
                <div className='appContent'>
                    <Suspense fallback={<Preloader />}>
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
                            <Route path='/nasaLibrary'
                                   render={ () => <NasaLibrary /> }/>
                            <Route exact path='/'
                                   render={ () => <StartedPage /> }/>
                            <Route path='*'
                                   render={ () => <Page404 /> }/>
                        </Switch>
                    </Suspense>
                    {showButton &&
                    <button className='backToTop'
                            onClick={ () => {window.scrollTo({top: 0, behavior: "smooth"})} }>
                        <BiArrowToTop className='topIcon'/> To top
                    </button>}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default App
