import {dateToday} from "../dateToday";
import React from "react";

export const datePickerHelper = (titleClass, title, inputClass, name, handleChange, handleBlur, value) => {
    return (
        <div>
            <p className={titleClass}>{title}</p>
            <input className={inputClass}
                   type="date"
                   name={name}
                   max={dateToday}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   value={value}/>
        </div>
    )
}


export const dateButtonHelper = (buttonClass, isValid, dirty, handleSubmit, text) => {
    return (
        <button className={buttonClass} disabled={!isValid && !dirty}
                onClick={handleSubmit}>{text}</button>
    )
}