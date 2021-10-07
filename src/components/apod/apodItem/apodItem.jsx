import React, {memo, useMemo, useState} from "react";
import s from "../apod.module.css";
import m from "../apodMedia.module.css";
import common from "../../../helpers/commonStyles/commonStyles.module.css";
import cn from "classnames";
import ModalWindow from "../../common/modalWindow/modalWindow";
import Lazyload from "react-lazyload";
import imagePlaceHolder from "../../../assets/images/imagePlaceholder.jpg";


const ApodItem = memo(({item}) => {

    //State for modal window
    const [modalWindow, setModalWindow] = useState(false)
    const [modalSrc, setModalSrc] = useState(``)

    useMemo(()=>{
      return item
    },[item])

    return (
        <div>
            {/*Item*/}
            <div className={cn(s.apodItem, m.apodItem)}>
                <Lazyload height={300}>
                    <div>
                        <h3 className={cn(s.apodTitle, m.apodTitle)}>{item.title}</h3>
                        <div className={s.apodImageHolder}>
                            <img className={s.apodImage}
                                 src={item.url}
                                 alt="apod"
                                 onClick={(e) => {
                                     setModalWindow(true)
                                     setModalSrc(e.currentTarget.src)
                                 }}
                                 onError={(e) => {
                                     e.target.src = imagePlaceHolder
                                 }}/>
                        </div>
                        <p className={cn(s.apodDate, m.apodDate)}>Date: {item.date}</p>
                        <p className={cn(s.apodExpTitle, m.apodExpTitle)}>Explanation</p>
                        <p className={cn(s.apodExplanation, m.apodExplanation)}>
                            {item.explanation || `Explanation not available`}</p>
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

export default ApodItem
