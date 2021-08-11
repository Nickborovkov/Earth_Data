import React from "react";

export const formInputHelper = (titleClass, title, touched, errors,
                            inputClass, type, name, max, handleChange, handleBlur, value) => {
    return (
        <div>
            <p className={titleClass}>{title}</p>
            {touched && errors &&
            <div>{errors}</div>}
            <input className={inputClass}
                   type={type}
                   name={name}
                   max={max}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   value={value}/>
        </div>
    )
}

export const formButtonHelper = (buttonClass, isValid, dirty, handleSubmit, text) => {
    return (
        <button className={buttonClass} disabled={!isValid && !dirty}
                onClick={handleSubmit}>{text}</button>
    )
}