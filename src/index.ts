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

    format(formatter: string) {
        let tokens = []
        let nextToken = ''
        for (let i = 0; i < formatter.length; i++) {
            if (formatter[i].match(/\W/)) {
                if (nextToken) {
                    tokens.push(nextToken)
                    nextToken = ''
                }
                tokens.push(formatter[i])
            }
            else {
                nextToken = nextToken + formatter[i]
                if (i > formatter.length - 2) {
                    tokens.push(nextToken)
                }
            }
        }

        let formattedDate = ''
        for (const token of tokens) {
            if (token.match(/\W/)) {
                formattedDate += token
                continue
            }
            switch (token) {
                // Month formatting
                case 'MMMMM':
                    formattedDate += this.months[this.getMonth()][0]; break
                case 'MMMM':
                    formattedDate += this.months[this.getMonth()]; break
                case 'MMM':
                    formattedDate += this.monthsShort[this.getMonth()]; break
                case 'MM':
                    formattedDate += this.#formatNumber(this.getMonthNumber()); break
                case 'M': 
                    formattedDate += this.getMonthNumber().toString(); break
                case 'Mo':
                    formattedDate += this.#getOrdinalNumber(this.getMonthNumber()); break
            }
        }
    }

    #getNextMonthNumber() {
        return this.getMonth() + 1 > 11 ? 0 : this.getMonth() + 1
    }

    getMonthNumber() {
        return this.getMonth() + 1 > 12 ? 1 : this.getMonth() + 1
    }

    #formatNumber(number: number) {
        const numberString = number.toString()
        return numberString.length > 1 ? numberString : '0' + numberString
    }

    #getOrdinalNumber(number: number) {
        const ordinals = ['st', 'nd', 'rd', 'th']
        if (parseInt(number.toString().slice(-1)) == 1) { return number.toString() + 'st' }
        if (parseInt(number.toString().slice(-1)) == 2) { return number.toString() + 'nd' }
        if (parseInt(number.toString().slice(-1)) == 3) { return number.toString() + 'rd' }
        if (parseInt(number.toString().slice(-1)) == 4) { return number.toString() + 'th' }
        if (parseInt(number.toString().slice(-1)) == 5) { return number.toString() + 'th' }
        if (parseInt(number.toString().slice(-1)) == 6) { return number.toString() + 'st' }
        if (parseInt(number.toString().slice(-1)) > 6 && parseInt(number.toString().slice(-1)) < 10) { return number.toString() + 'th' }
        if (number > 10 && number < 20) { return number.toString() + 'th' }
        if (number % 10 == 0) { return number.toString() + 'th' }
    }

}