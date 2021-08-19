import React from "react";
import s from "../neows.module.css";
import Lazyload from "react-lazyload";

const NeowsItem = ({item}) => {
    return (
        <div>
            {/*Item*/}
            <div className={s.asteroid}>
                <Lazyload>
                    <div>
                        <p className={s.name}>Asteroid name: {item.name}</p>
                        <div className={s.diam}>
                            <p className={s.diameter}>Diameter:</p>
                            <p className={s.diameterEpx}>From: {item
                                .estimated_diameter
                                .meters
                                .estimated_diameter_min.toFixed(2)} meters</p>
                            <p className={s.diameterEpx}>To: {item
                                .estimated_diameter
                                .meters
                                .estimated_diameter_max.toFixed(2)} meters</p>
                        </div>
                        <div>
                            <p className={s.danger}>
                                Potentially hazardous? -
                                {
                                    !item.is_potentially_hazardous_asteroid
                                        ? <span> No</span>
                                        : <span className={s.hazardExp}> Yes</span>
                                }
                            </p>
                        </div>
                    </div>
                </Lazyload>
            </div>
        </div>
    )
}

export default NeowsItem