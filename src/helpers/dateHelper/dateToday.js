const now = new Date()

export const yearNow = String(now.getFullYear())
export const monthNow = String(now.getMonth() + 1).length === 1
    ? `0${String(now.getMonth() + 1)}`
    : String(now.getMonth() + 1)

//Fix for some server requests which work only on timezone UTC-3
export const dayFixedNow = () => {
    const hoursNow = now.getHours()
    const hoursUTCNow = hoursNow - 6
    let dayNow
    if(hoursNow - hoursUTCNow < 6 && hoursNow - hoursUTCNow > -6){
        dayNow = String(now.getDate()).length === 1
            ? `0${String(now.getDate() )}`
            : String(now.getDate())
    }else {
        dayNow = String(now.getDate() - 1).length === 1
            ? `0${String(now.getDate() - 1)}`
            : String(now.getDate() - 1)
    }
    return dayNow
}

export const dateToday = `${yearNow}-${monthNow}-${dayFixedNow()}`