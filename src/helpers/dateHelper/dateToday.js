const now = new Date()

export const yearNow = String(now.getFullYear())
export const monthNow = String(now.getMonth() + 1).length === 1
    ? `0${String(now.getMonth() + 1)}`
    : String(now.getMonth() + 1)
export const dayNow = String(now.getDate() - 1).length === 1
    ? `0${String(now.getDate() - 1)}`
    : String(now.getDate() - 1)

export const dateToday = `${yearNow}-${monthNow}-${dayNow}`
