import React, {memo} from "react";
import s from "./modalWindow.module.css"
import cn from 'classnames'

const ModalWindow = memo(({active, setActive, children}) => {
    return (
        <div className={cn(s.modalBody, active && s.activeBody)}
             onClick={ () => { setActive(false) } }>
            <div className={s.modalContent}
                 onClick={ (e) => {e.stopPropagation()} }>
                {children}
            </div>

        </div>
    )
})

export default ModalWindow