import './App.css';
import React, {Suspense, lazy} from "react";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Navbar from "./components/navbar/navbar";
import {Route, Switch} from "react-router-dom";
import StartedPage from "./helpers/jsxHelpersPages/startedPage";
import Page404 from "./helpers/jsxHelpersPages/page404";
import Preloader from "./helpers/preloaders/preloader";
const Apod = lazy( () => import("./components/apod/apod"))
const Neows = lazy( () => import("./components/neosw/neows" ))
const Earth = lazy( () =>  import("./components/earth/earth"))
const EarthImage = lazy( () => import("./components/earthImage/earthImage"))
const MarsRover = lazy( () =>  import("./components/marsRover/marsRover"))
const NasaLibrary = lazy( () => import("./components/NASAlibrary/nasaLibrary") )



let App = () => {
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

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default App