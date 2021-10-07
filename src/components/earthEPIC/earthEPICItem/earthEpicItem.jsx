import React, {memo, useState} from "react";
import s from "../earthEpic.module.css";
import m from "../earthEpicMedia.module.css";
import common from "../../../helpers/commonStyles/commonStyles.module.css";
import cn from "classnames";
import Lazyload from "react-lazyload";
import imagePreloader from "../../common/preloaders/imageLoader.gif"
import ModalWindow from "../../common/modalWindow/modalWindow";
import {earthEpicURLHelper} from "../../../helpers/urlHelper/earthEpicURLHelper";
import {useSelector} from "react-redux";

const EarthEPICItem = memo(({item}) => {

    //State
    const SelectedDate = useSelector(state => state.earthImage.date)

    //State for modal window
    const [modalWindow, setModalWindow] = useState(false)
    const [modalSrc, setModalSrc] = useState(``)

    return (
        <div>
            {/*Item*/}
            <div className={cn(s.imagesItem, m.imagesItem)}>
                <Lazyload height={300}>
                    <div>
                        <div>
                            <h3 className={s.imageDate}>Date: {item.date}</h3>
                            <p className={s.params}>Latitude: {item.centroid_coordinates.lat}</p>
                            <p className={s.params}>Longitude: {item.centroid_coordinates.lon}</p>
                        </div>
                        <div className={s.imageHolder}>
                            <img className={s.image}
                                 src={imagePreloader}
                                 alt="earthImage"
                                 onClick={(e) => {
                                     setModalWindow(true)
                                     setModalSrc(e.currentTarget.src)
                                 }}
                                 onLoad={(e) => {
                                     e.target.src = earthEpicURLHelper(SelectedDate, item.image)
                                 }}
                            />
                        </div>
                    </div>
                </Lazyload>
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

export default EarthEPICItem
