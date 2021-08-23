import React, {memo, useState} from "react";
import s from "../marsRover.module.css";
import m from "../marsRoverMedia.module.css";
import common from "../../../helpers/commonStyles/commonStyles.module.css";
import cn from "classnames";
import LazyLoad from "react-lazyload";
import imagePreloader from "../../../helpers/preloaders/imageLoader.gif"
import ModalWindow from "../../../helpers/modalWindow/modalWindow";

const MarsRoverItem = memo(({item}) => {

    //State for modal window
    const [modalWindow, setModalWindow] = useState(false)
    const [modalSrc, setModalSrc] = useState(``)

    return (
        <div>
            {/*Item*/}
            <div className={cn(s.item, m.item)}>
                <LazyLoad height={300}>
                    <div>
                        <p className={s.params}>Rover: {item.rover.name}</p>
                        <p className={s.params}>Status: {item.rover.status}</p>
                        <p className={s.params}>Camera name: {item.camera.full_name}</p>
                        <p className={s.params}>Earth date: {item.earth_date}</p>
                        <div className={s.imageHolder}>
                            <img className={s.image}
                                 src={imagePreloader}
                                 alt="roverPhoto"
                                 onClick={(e) => {
                                     setModalWindow(true)
                                     setModalSrc(e.currentTarget.src)
                                 }}
                                 onLoad={(e) => {
                                     e.target.src = item.img_src
                                 }}/>
                        </div>
                    </div>
                </LazyLoad>
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
})

export default MarsRoverItem