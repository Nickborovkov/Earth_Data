import React, {useState} from "react";
import s from "../earthObs.module.css";
import m from "../earthObsMedia.module.css";
import common from "../../../helpers/commonStyles/commonStyles.module.css";
import cn from "classnames";
import imagePlaceHolder from "../../../images/imagePlaceholder.jpg";
import ModalWindow from "../../../helpers/modalWindow/modalWindow";

const EarthObsItem = ({item}) => {

    //State for modal window
    const [modalWindow, setModalWindow] = useState(false)
    const [modalSrc, setModalSrc] = useState(``)

    return (
        <div>
            {/*Item*/}
            <div className={cn(s.result, m.result)}>
                <p className={s.earthParams}>ID: {item.id}</p>
                <p className={s.earthParams}>Date: {item.date}</p>
                <div className={s.imageHolder}>
                    <img className={s.image}
                         src={item.url}
                         alt="earthObs"
                         onClick={ (e) => {
                             setModalWindow(true)
                             setModalSrc(e.currentTarget.src)
                         }}
                         onError={ (e) => {e.target.src = imagePlaceHolder}}/>
                </div>
            </div>

            {/*Modal window*/}
            {modalWindow &&
            <ModalWindow active={modalWindow} setActive={setModalWindow}>
                <img className={cn(common.modalImage)}
                     src={modalSrc}
                     alt="modal"/>
            </ModalWindow>}

        </div>
    )
}

export default EarthObsItem