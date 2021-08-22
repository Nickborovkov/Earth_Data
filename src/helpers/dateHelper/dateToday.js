const now = new Date()

export const yearNow = String(now.getFullYear())
export const monthNow = String(now.getMonth() + 1).length === 1
    ? `0${String(now.getMonth() + 1)}`
    : String(now.getMonth() + 1)

//Fix for some server requests which work correctly only on timezone UTC-6
export const dayFixedNow = () => {
    const hoursNow = now.getHours()
    const hoursUTCNow = hoursNow - 8
    let dayNow
    if(hoursNow - hoursUTCNow < 8 && hoursNow - hoursUTCNow > -8){
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