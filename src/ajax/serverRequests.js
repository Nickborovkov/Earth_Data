import axios from "axios";

const instance = axios.create({
    baseURL: `https://api.nasa.gov/`,
})

const apiKey = `ZWGiTATMzPHjpsUJSj289aerwaSsLpikIiYBhaek`

let year = `2020`
let month = `08`
let day = `07`

export const nasaRequest = {
    getAPOD (date) {
        return instance.get(`planetary/apod?date=${date}&api_key=${apiKey}`)
    },
    getAPODwithInterval (startDate, endDate) {
        return instance.get(`planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
    },
    getNeows (startDate, endDate) {
        return instance.get(`neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
    },
    getEarthObservation (lon, lat, date, dim) {
        return instance.get(`planetary/earth/assets?lon=${lon}&lat=${lat}&date=${date}&&dim=${dim}&api_key=${apiKey}`)
    },
    getEarthImage () {
        return instance.get(`EPIC/api/natural/date/${year}-${month}-${day}?api_key=${apiKey}`)
    },
    getMarsRoverPhotos () {
        return instance.get(`mars-photos/api/v1/rovers/curiosity/photos?earth_date=2020-12-30&api_key=${apiKey}`)
    }
}