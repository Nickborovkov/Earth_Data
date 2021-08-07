import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEarthImage} from "../../reducers/earthImage";

const EarthImage = () => {

    const earthImage = useSelector(state => state.earthImage.earthImage)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getEarthImage)
    },[])

    return (
        <div>
            <h2>See dated Earth Image</h2>
            <img src={earthImage} alt="earthImage"/>
        </div>
    )
}

export default EarthImage