import React from "react";
import s from './helpers.module.css'

const Page404 = () => {
    return (
        <div className={s.page404}>
            <h1 className={s.page404Title}>Error</h1>
            <p className={s.page404Subtitle}>Results not found</p>
        </div>
    )
}

export default Page404