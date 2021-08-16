import React from "react";
import s from "./modalWindow.module.css"
import cn from 'classnames'

const ModalWindow = ({active, setActive, src}) => {
    return (
        <div className={cn(s.modalBody, active && s.modalBody_active)}
             onClick={ () => {setActive(false)} }>
            <div className={s.modalContent}
                 onClick={ (e) => {e.stopPropagation()} }>
                <img className={s.modalImage} src={src} alt="modalItem"/>
            </div>
        </div>
    )
}

export default ModalWindow