export default class Jate extends Date {

    static defaultFormat: string = ''
    static namedFormat: any = {}

    static setFormat(name: string, format: string) {
        Jate.namedFormat[name] = format
    }
    static removeFormat(name: string) {
        delete Jate.namedFormat?.[name]
    }

    private static months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    private static monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    private static days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    private static daysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    getMonthName(type: 'long' | 'short' = 'long') {
        return type == 'short' ? Jate.monthsShort[this.getMonth()] : Jate.months[this.getMonth()]
    }

    getDayName(type: 'long' | 'short' = 'long') {
        return type == 'short' ? Jate.daysShort[this.getDay()] : Jate.days[this.getDay()]
    }

    getDayOfYear() {
        const start = new Jate(this.getFullYear(), 0, 0).getTime()
        const diff = (this.getTime()) - start
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    nformat(name: string) {
        return this.format(Jate.namedFormat?.[name] || '')
    }

    format(formatter: string = Jate.defaultFormat) {
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
                // Year formatting
                case 'yyyy': formattedDate += this.#formatNumber(this.getFullYear(), 4); break
                case 'yyy': formattedDate += this.#formatNumber(this.getFullYear(), 3); break
                case 'yy': formattedDate += this.#formatNumber(this.getFullYear(), 2); break
                case 'yo': formattedDate += this.#getOrdinalNumber(this.getFullYear()); break
                case 'y': formattedDate += this.getFullYear(); break
                // Quarter formatting
                case 'qqqqq': case 'QQQQQ': formattedDate += this.getQuarter(); break
                case 'qqqq': case 'QQQQ': formattedDate += this.#getOrdinalNumber(this.getQuarter()) + 'quarter'; break
                case 'qqq': case 'QQQ': formattedDate += 'Q' + this.getQuarter(); break
                case 'qq': case 'QQ': formattedDate += this.#formatNumber(this.getQuarter(), 5); break
                case 'qo': case 'Qo': formattedDate += this.#getOrdinalNumber(this.getQuarter()); break
                case 'q': case 'Q': formattedDate += this.getQuarter(); break
                // Month formatting
                case 'LLLLL': case 'MMMMM': formattedDate += Jate.months[this.getMonth()][0]; break
                case 'LLLL': case 'MMMM': formattedDate += Jate.months[this.getMonth()]; break
                case 'LLL': case 'MMM': formattedDate += Jate.monthsShort[this.getMonth()]; break
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
                case 'EEEEEE': formattedDate += Jate.days[this.getDay() - 1].substring(0, 2); break
                case 'EEEEE': formattedDate += Jate.days[this.getDay() - 1].substring(0, 1); break
                case 'EEEE': formattedDate += Jate.days[this.getDay() - 1]; break
                case 'EEE': case 'EE': case 'E': formattedDate += Jate.days[this.getDay() - 1].substring(0, 3); break
                // AM - PM
                case 'aaaaa': formattedDate += this.#getMeridiem().charAt(0); break
                case 'aaaa': formattedDate += this.#getMeridiem().split('').join('.') + "."; break
                case 'aaa': formattedDate += this.#getMeridiem(); break
                case 'aa': case 'a': formattedDate += this.#getMeridiem().toUpperCase(); break
                // Hour formatting
                case 'hh': formattedDate += this.#formatNumber(this.#getHour(this.getHours(), 1, 12)); break
                case 'ho': formattedDate += this.#getOrdinalNumber(this.#getHour(this.getHours(), 1, 12)); break
                case 'h': formattedDate += this.#getHour(this.getHours(), 1, 12); break
                case 'HH': formattedDate += this.#formatNumber(this.#getHour(this.getHours(), 0, 23)); break
                case 'Ho': formattedDate += this.#getOrdinalNumber(this.#getHour(this.getHours(), 0, 23)); break
                case 'H': formattedDate += this.#getHour(this.getHours(), 0, 23); break
                case 'kk': formattedDate += this.#formatNumber(this.#getHour(this.getHours(), 1, 24)); break
                case 'ko': formattedDate += this.#getOrdinalNumber(this.#getHour(this.getHours(), 1, 24)); break
                case 'k': formattedDate += this.#getHour(this.getHours(), 1, 24); break
                // Minute formatting
                case 'mm': formattedDate += this.#formatNumber(this.getMinutes()); break
                case 'mo': formattedDate += this.#getOrdinalNumber(this.getMinutes()); break
                case 'm': formattedDate += this.getMinutes(); break
                // Second formatting
                case 'ss': formattedDate += this.#formatNumber(this.getSeconds()); break
                case 'so': formattedDate += this.#getOrdinalNumber(this.getSeconds()); break
                case 's': formattedDate += this.getSeconds(); break
                // Milliseconds
                case 'SSS': formattedDate += this.#formatNumber(this.getMilliseconds(), 3); break
                case 'SS': formattedDate += this.#formatNumber(this.getMilliseconds()); break
                case 'S': formattedDate += this.getMilliseconds(); break
            }
        }

        return formattedDate
    }

    #increment(amount: number, type: string, factor: number = 1) {
        const now = this.getTime()
        switch(type.toLowerCase()) {
            case 'd': case 'day': case 'days': this.setTime(now + factor * (amount * 24 * 60 * 60 * 1000)); break
            case 'minute': case 'minutes': case 'min': case 'mins': this.setTime(now + factor * (amount * 60 * 1000)); break
            case 'h': case 'hours': case 'hour': this.setTime(now + factor * (amount * 60 * 60 * 1000)); break
            case 's': case 'second': case 'seconds': this.setTime(now + factor * (amount * 1000)); break;
            case 'ms': case 'milliseconds': case 'millisecond': this.setTime(now + factor * (amount)); break
        }
    }

    add(amount: number, type: string): Jate {
        this.#increment(amount, type)
        return this
    }

    subtract(amount: number, type: string): Jate {
        this.#increment(amount, type, -1)
        return this
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
        const j = number % 10,
        k = number % 100
        if (j == 1 && k != 11) {
            return number + "st"
        }
        if (j == 2 && k != 12) {
            return number + "nd"
        }
        if (j == 3 && k != 13) {
            return number + "rd"
        }
        return number + "th"
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

    #getHour(hour: number, min: number, max: number) {
        if (hour > max) {
            return min + (hour - max - 1)
        }
        if (hour < min) {
            return min
        }
        return hour
    }

}
