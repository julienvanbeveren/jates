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

    getDayOfYear() {
        const start = new Jate(this.getFullYear(), 0, 0).getTime()
        const diff = (this.getTime()) - start
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    format(formatter: string) {
        let tokens = []
        let nextToken = ''
        for (let i = 0; i < formatter.length; i++) {
            if (formatter[i].match(/\W/)) {
                if (['{', '}'].includes(formatter[i])) {
                    if (formatter[i] == '{') {
                        if (nextToken) {
                            tokens.push(nextToken)
                        }
                        nextToken = '{'
                        continue
                    }
                    if (formatter[i] == '}') {
                        nextToken += '}'
                        tokens.push(nextToken)
                        nextToken = ''
                        continue
                    }
                }
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
            if (token.includes('{') && token.includes('}')) {
                formattedDate += token.replace('{', '').replace('}', '')
                continue
            }
            if (token.match(/\W/)) {
                formattedDate += token
                continue
            }
            switch (token) {
                // Month formatting
                case 'LLLLL': case 'MMMMM': formattedDate += this.months[this.getMonth()][0]; break
                case 'LLLL': case 'MMMM': formattedDate += this.months[this.getMonth()]; break
                case 'LLL': case 'MMM': formattedDate += this.monthsShort[this.getMonth()]; break
                case 'LL': case 'MM': formattedDate += this.#formatNumber(this.getMonthNumber()); break
                case 'L': case 'M':  formattedDate += this.getMonthNumber().toString(); break
                case 'Lo': case 'Mo': formattedDate += this.#getOrdinalNumber(this.getMonthNumber()); break
                // Day formatting
                case 'dd': formattedDate += this.#formatNumber(this.getDate()); break
                case 'do': formattedDate += this.#getOrdinalNumber(this.getDate()); break
                case 'd': formattedDate += this.getDate(); break
                case 'DDD': formattedDate += this.#formatNumber(this.getDayOfYear(), 3); break
                case 'DD': formattedDate += this.#formatNumber(this.getDayOfYear(), 2); break
                case 'Do': formattedDate += this.#getOrdinalNumber(this.getDayOfYear()); break
                case 'D': formattedDate += this.#formatNumber(this.getDayOfYear(), 1); break
                case 'EEEEEE': formattedDate += this.days[this.getDay() - 1].substring(0, 2); break
                case 'EEEEE': formattedDate += this.days[this.getDay() - 1].substring(0, 1); break
                case 'EEEE': formattedDate += this.days[this.getDay() - 1]; break
                case 'EEE': case 'EE': case 'E': formattedDate += this.days[this.getDay() - 1].substring(0, 3); break
                // Quarter formatting
                case 'qqqqq': case 'QQQQQ': formattedDate += this.getQuarter(); break
                case 'qqqq': case 'QQQQ': formattedDate += this.#getOrdinalNumber(this.getQuarter()) + 'quarter'; break
                case 'qqq': case 'QQQ': formattedDate += 'Q' + this.getQuarter(); break
                case 'qq': case 'QQ': formattedDate += this.#formatNumber(this.getQuarter(), 5); break
                case 'qo': case 'Qo': formattedDate += this.#getOrdinalNumber(this.getQuarter()); break
                case 'q': case 'Q': formattedDate += this.getQuarter(); break
                // AM - PM
                case 'aaaaa': formattedDate += this.#getMeridiem().charAt(0); break
                case 'aaaa': formattedDate += this.#getMeridiem().split('').join(','); break
                case 'aaa': formattedDate += this.#getMeridiem(); break
                case 'aa': case 'a': formattedDate += this.#getMeridiem().toUpperCase(); break
            }
        }

        return formattedDate
    }

    #getNextMonthNumber() {
        return this.getMonth() + 1 > 11 ? 0 : this.getMonth() + 1
    }

    getMonthNumber() {
        return this.getMonth() + 1 > 12 ? 1 : this.getMonth() + 1
    }

    #formatNumber(number: number, digits: number = 2) {
        const numberString = number.toString()
        return numberString.length > digits - 1 ? numberString : '0'.repeat(digits - numberString.length) + numberString
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

    getQuarter() {
        return Math.ceil(this.getMonthNumber() / 4)
    }

    #getMeridiem() {
        if (this.getHours() > 12 || (this.getHours() == 11 && (this.getMinutes() > 0 || this.getSeconds() > 0 || this.getMilliseconds() > 0))) {
            return 'am'
        }
        else { return 'pm' }
    }

}