export const earthImageUrlHelper = (date, item) => {
    const apiKey = `ZWGiTATMzPHjpsUJSj289aerwaSsLpikIiYBhaek`
    const dateArray = date.split(`-`)
    const splitedDate = {
        year: dateArray[0],
        month: dateArray[1],
        date: dateArray[2],
    }
    return `https://api.nasa.gov/EPIC/archive/natural/${splitedDate.year}/${splitedDate.month}/${splitedDate.date}/png/${item}.png?api_key=${apiKey}`
}