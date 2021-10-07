import axios from "axios";

const instance = axios.create({
    baseURL: `https://api.nasa.gov/`,
})

const apiKey = `ZWGiTATMzPHjpsUJSj289aerwaSsLpikIiYBhaek`

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
    getEarthObservation (lon, lat) {
        return instance.get(`planetary/earth/assets?lon=${lon}&lat=${lat}&dim=0.1&api_key=${apiKey}`)
    },
    getEarthImage (date) {
        return instance.get(`EPIC/api/natural/date/${date}?api_key=${apiKey}`)
    },
    getMarsRoverPhotos (rover, date, page) {
        return instance.get(`mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&page=${page}&api_key=${apiKey}`)
    },
    searchNasaLibrary (search, mediaType, yearStart, yearEnd, page) {
        return axios.get(`https://images-api.nasa.gov/search?q=${search}&media_type=${mediaType}&page=${page}&year_start=${yearStart}&year_end=${yearEnd}`)
    }
}