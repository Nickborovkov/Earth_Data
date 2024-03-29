import React from "react";
import s from './formsStyles.module.css'
import { RiErrorWarningFill } from 'react-icons/ri'

export const formInputHelper = (titleClass, title, touched, errors, inputClass, type, name,
                                min, max, handleChange, handleBlur, value, inputMode, autofocus) => {
    return (
        <div className={s.inputHolder}>
            <p className={titleClass}>{title}</p>
            <input className={inputClass}
                   type={type}
                   name={name}
                   min={min}
                   max={max}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   value={value}
                   inputMode={inputMode}
                   autoFocus={autofocus}/>
            {touched && errors &&
            <div className={s.errors}><RiErrorWarningFill/>   {errors}</div>}
        </div>
    )
}

export const formButtonHelper = (buttonClass, isValid, dirty, handleSubmit, text) => {
    return (
        <button className={buttonClass}
                disabled={!isValid && !dirty}
                onClick={handleSubmit}
                type='submit'>{text}</button>
    )
}