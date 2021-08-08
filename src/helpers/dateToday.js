const now = new Date()

export const dateToday = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() - 1}`
//TODO fix timezones bug (when in Russia it's already next day, in USA where i suppose NASA server is situated is still previous day, so
// the API don't work, cause USA is in a totally different timezone)