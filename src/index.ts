export default class Jate extends Date {

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    daysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    getMonthName(type: 'long' | 'short' = 'long') {
        return type == 'short' ? this.monthsShort[this.getMonth()] : this.months[this.getMonth()]
    }

    getDayName(type: 'long' | 'short' = 'long') {
        return type == 'short' ? this.daysShort[this.getDay()] : this.days[this.getDay()]
    }

}