import { formatter } from './functions'
import { DAYS, DAYS_SHORT, MONTHS, MONTHS_SHORT } from './utils/consts'

export default class Jate extends Date {
  static defaultFormat: string = ''
  static namedFormat: any = {}

  static setFormat(name: string, format: string) {
    Jate.namedFormat[name] = format
  }
  static removeFormat(name: string) {
    delete Jate.namedFormat?.[name]
  }

  getMonthName(type: 'long' | 'short' = 'long') {
    return type == 'short' ? MONTHS_SHORT[this.getMonth()] : MONTHS[this.getMonth()]
  }

  getDayName(type: 'long' | 'short' = 'long') {
    return type == 'short' ? DAYS_SHORT[this.getDay()] : DAYS[this.getDay()]
  }

  getDayOfYear() {
    const start = new Jate(this.getFullYear(), 0, 0).getTime()
    const diff = this.getTime() - start
    const oneDay = 1000 * 60 * 60 * 24
    return Math.floor(diff / oneDay)
  }

  nformat(name: string) {
    return this.format(Jate.namedFormat?.[name] || '')
  }

  format(string: string = Jate.defaultFormat) {
    return formatter(this, string)
  }

  #increment(amount: number, type: string, factor: number = 1) {
    const now = this.getTime()
    switch (type.toLowerCase()) {
      case 'd':
      case 'day':
      case 'days':
        this.setTime(now + factor * (amount * 24 * 60 * 60 * 1000))
        break
      case 'minute':
      case 'minutes':
      case 'min':
      case 'mins':
        this.setTime(now + factor * (amount * 60 * 1000))
        break
      case 'h':
      case 'hours':
      case 'hour':
        this.setTime(now + factor * (amount * 60 * 60 * 1000))
        break
      case 's':
      case 'second':
      case 'seconds':
        this.setTime(now + factor * (amount * 1000))
        break
      case 'ms':
      case 'milliseconds':
      case 'millisecond':
        this.setTime(now + factor * amount)
        break
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

  getMonthNumber() {
    return this.getMonth() + 1 > 12 ? 1 : this.getMonth() + 1
  }

  getQuarter() {
    return Math.ceil(this.getMonthNumber() / 4)
  }
}
