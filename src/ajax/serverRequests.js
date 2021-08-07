import axios from "axios";

const instance = axios.create({
    baseURL: `https://api.nasa.gov/`
})

const apiKey = `ZWGiTATMzPHjpsUJSj289aerwaSsLpikIiYBhaek`

let year = `2020`
let month = `08`
let day = `07`

export const nasaRequest = {
    getAPOD () {
        return instance.get(`planetary/apod?api_key=${apiKey}`)
    },
    getNeows (date) {
        return instance.get(`neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${apiKey}`)
    },
    getEarthObservation () {
        return instance.get(`planetary/earth/assets?lon=34.537324&lat=28.572325&date=2018-01-01&&dim=0.10&api_key=${apiKey}`)
    },
    getEarthImage () {
        return instance.get(`EPIC/api/natural/date/${year}-${month}-${day}?api_key=${apiKey}`)
    }
}