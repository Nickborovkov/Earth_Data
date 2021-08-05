import axios from "axios";

const instance = axios.create({
    baseURL: `https://api.nasa.gov/`,
    headers: {
        API_KEY : `ZWGiTATMzPHjpsUJSj289aerwaSsLpikIiYBhaek`,
    }
})

const key = `ZWGiTATMzPHjpsUJSj289aerwaSsLpikIiYBhaek`


export const nasaAPI = {
    getAPOD() {
        return instance.get(`planetary/apod?api_key=${key}&start_date=2020-12-22&end_date=2020-12-31`)
    }
}
