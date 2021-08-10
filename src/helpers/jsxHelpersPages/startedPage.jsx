import React from "react";
import s from './helpers.module.css'

const StartedPage = () => {
    return (
        <div className={s.starterPage}>
            <h1 className={s.starterTitle}>This is an app build with NASA public API</h1>
            <p className={s.starterSubtitle}>Results may take some time to load due to long server response, please be patient</p>
            <p className={s.starterSubtitle}>Made by Nick Borovkov</p>
        </div>
    )
}

export default StartedPage