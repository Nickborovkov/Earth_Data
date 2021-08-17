import React from "react";
import s from "./modalWindow.module.css"
import cn from 'classnames'

const ModalWindow = ({active, setActive, children}) => {
    return (
        <div className={cn(s.modalBody, active && s.activeBody)}
             onClick={ () => { setActive(false) } }>
            <div className={cn(s.modalContent, active && s.activeContent)}
                 onClick={ (e) => {e.stopPropagation()} }>
                {children}
            </div>
        </div>
    )
}

export default ModalWindow