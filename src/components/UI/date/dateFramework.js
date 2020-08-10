export function formatDate(dateString) {
    const dateArr = dateString.split('-')
    return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0]
}

export function getCurrentDate() {
    const date = new Date()
    let month = "" + date.getMonth()
    month = month.length < 2 ? "0" + month : month
    return date.getFullYear() + "-" + month + "-" + date.getDate()
}