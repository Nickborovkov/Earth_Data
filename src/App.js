import './App.css';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPictureOfTheDay} from "./reducers/reducer";
import Preloader from "./preloader";

let App = () => {

    const dispatch = useDispatch()
    let apod = useSelector(state => state.main.pictureOFTheDay)
    let date = useSelector(state => state.main.date)

    useEffect(()=>{
        dispatch(setPictureOfTheDay(date))
    },[])

    const [explanation, setExplatation] = useState(false)

    const toggleExplanation = () => {
        explanation
            ? setExplatation(false)
            :setExplatation(true)
    }


    if(!apod) return <Preloader />


  return (
      <div className='container p-5'>
          <h1 className='mainTitle'>NASA API pictures of the day</h1>
          <div className='row'>
              {
                  apod.map(a => <div key={a.date} className='col-lg m-3 p-3 shadow infoBox'>
                      <h2 className='cardTitle'>{a.title}</h2>
                      <img className='apodImage'
                           src={a.url ? a.url : `https://via.placeholder.com/300`}
                           alt="apod"/>
                      <div>
                          <p className='subtitle'>Date</p>
                          <p className='inner'>{a.date}</p>
                      </div>
                      <button onClick={toggleExplanation}>See info</button>
                      {explanation &&
                      <div>
                          <p className='subtitle'>Explanation</p>
                          <p className='inner'>{a.explanation}</p>
                      </div>
                      }

                      {a.copyright &&
                      <div>
                          <p className='subtitle'>Copyright</p>
                          <p className='inner'>{a.copyright}</p>
                      </div>
                      }

                  </div>)
              }
          </div>



          
      </div>
  )
}

export default App