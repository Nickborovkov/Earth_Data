import React, {useEffect, useState} from "react";
import s from "../nasaLibrary.module.css";
import m from "../nasaLibraryMedia.module.css";
import common from "../../../helpers/commonStyles/commonStyles.module.css";
import cn from "classnames";
import imagePlaceHolder from "../../../images/imagePlaceholder.jpg";
import Lazyload from 'react-lazyload'
import ModalWindow from "../../../helpers/modalWindow/modalWindow";
import {getVideoLinks} from "../../../reducers/nasaLibrary";
import {useDispatch, useSelector} from "react-redux";
import { AiFillPlayCircle } from 'react-icons/ai'

const NASALibraryItem = ({item, mediaType}) => {

    //State
    const dispatch = useDispatch()

    const videosLinks = useSelector(state => state.library.videosLinks)

    //State for modal window
    const [modalWindow, setModalWindow] = useState(false)
    const [modalSrc, setModalSrc] = useState(``)

    //Setting videos src to state
    const [videoSrc, setVideoSrc] = useState(``)

    //Loading video when needed
    useEffect(()=>{
        if(mediaType === `video` && videoSrc !== ``)
        dispatch(getVideoLinks(videoSrc))
    },[dispatch, mediaType, videoSrc])

    return (
        <div>
            {/*Item*/}
            <div className={cn(s.imageHolder, m.imageHolder)}>
                <Lazyload height={100}>
                    <img className={cn(s.image, m.image)}
                         src={item.links[0].href}
                         alt="archivePhoto"
                         onClick={(e) => {
                             if (mediaType === `image`) {
                                 setModalWindow(true)
                                 setModalSrc(e.currentTarget.src)
                             } else if (mediaType === `video`) {
                                 setModalWindow(true)
                                 setVideoSrc(item.href)
                             }
                         }}
                         onError={(e) => {
                             e.target.src = imagePlaceHolder}}/>
                    {mediaType === `video` &&
                            <AiFillPlayCircle className={s.videoIcon}
                                              onClick={ () => {
                                                  setModalWindow(true)
                                                  setVideoSrc(item.href)
                                              } }/>}
                </Lazyload>
            </div>

            {/*Modal window for images*/}
            {modalWindow && mediaType === `image` &&
            <ModalWindow active={modalWindow} setActive={setModalWindow}>
                <img className={cn(common.modalImage)}
                     src={modalSrc}
                     alt="modal"/>
            </ModalWindow>}

            {/*Modal window for videos*/}
            {modalWindow && mediaType === `video` &&
            <ModalWindow active={modalWindow} setActive={setModalWindow}>
                <video className={common.video}
                       src={videosLinks[0]}
                       controls
                       autoPlay/>
            </ModalWindow>}

        </div>

    )
}

export default NASALibraryItem