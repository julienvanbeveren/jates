import Jate from '..'
import { formatNumber, getHour, getMeridiem, getOrdinalNumber } from '../utils'
import { DAYS, MONTHS, MONTHS_SHORT } from '../utils/consts'

export function formatter(jate: Jate, string: string) {
  let tokens = []
  let nextToken = ''
  for (let i = 0; i < string.length; i++) {
    if (string[i].match(/\W/)) {
      if (['{', '}'].includes(string[i])) {
        if (string[i] == '{') {
          if (nextToken) {
            tokens.push(nextToken)
          }
          nextToken = '{'
          continue
        }
        if (string[i] == '}') {
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
      tokens.push(string[i])
    } else {
      nextToken = nextToken + string[i]
      if (i > string.length - 2) {
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
      case 'yyyy':
        formattedDate += formatNumber(jate.getFullYear(), 4)
        break
      case 'yyy':
        formattedDate += formatNumber(jate.getFullYear(), 3)
        break
      case 'yy':
        formattedDate += formatNumber(jate.getFullYear(), 2)
        break
      case 'yo':
        formattedDate += getOrdinalNumber(jate.getFullYear())
        break
      case 'y':
        formattedDate += jate.getFullYear()
        break
      // Quarter formatting
      case 'qqqqq':
      case 'QQQQQ':
        formattedDate += jate.getQuarter()
        break
      case 'qqqq':
      case 'QQQQ':
        formattedDate += getOrdinalNumber(jate.getQuarter()) + 'quarter'
        break
      case 'qqq':
      case 'QQQ':
        formattedDate += 'Q' + jate.getQuarter()
        break
      case 'qq':
      case 'QQ':
        formattedDate += formatNumber(jate.getQuarter(), 5)
        break
      case 'qo':
      case 'Qo':
        formattedDate += getOrdinalNumber(jate.getQuarter())
        break
      case 'q':
      case 'Q':
        formattedDate += jate.getQuarter()
        break
      // Month formatting
      case 'LLLLL':
      case 'MMMMM':
        formattedDate += MONTHS[jate.getMonth()][0]
        break
      case 'LLLL':
      case 'MMMM':
        formattedDate += MONTHS[jate.getMonth()]
        break
      case 'LLL':
      case 'MMM':
        formattedDate += MONTHS_SHORT[jate.getMonth()]
        break
      case 'LL':
      case 'MM':
        formattedDate += formatNumber(jate.getMonthNumber())
        break
      case 'L':
      case 'M':
        formattedDate += jate.getMonthNumber().toString()
        break
      case 'Lo':
      case 'Mo':
        formattedDate += getOrdinalNumber(jate.getMonthNumber())
        break
      // Day formatting
      case 'dd':
        formattedDate += formatNumber(jate.getDate())
        break
      case 'do':
        formattedDate += getOrdinalNumber(jate.getDate())
        break
      case 'd':
        formattedDate += jate.getDate()
        break
      case 'DDD':
        formattedDate += formatNumber(jate.getDayOfYear(), 3)
        break
      case 'DD':
        formattedDate += formatNumber(jate.getDayOfYear(), 2)
        break
      case 'Do':
        formattedDate += getOrdinalNumber(jate.getDayOfYear())
        break
      case 'D':
        formattedDate += formatNumber(jate.getDayOfYear(), 1)
        break
      case 'EEEEEE':
        formattedDate += DAYS[jate.getDay() - 1].substring(0, 2)
        break
      case 'EEEEE':
        formattedDate += DAYS[jate.getDay() - 1].substring(0, 1)
        break
      case 'EEEE':
        formattedDate += DAYS[jate.getDay() - 1]
        break
      case 'EEE':
      case 'EE':
      case 'E':
        formattedDate += DAYS[jate.getDay() - 1].substring(0, 3)
        break
      // AM - PM
      case 'aaaaa':
        formattedDate += getMeridiem(jate).charAt(0)
        break
      case 'aaaa':
        formattedDate += getMeridiem(jate).split('').join('.') + '.'
        break
      case 'aaa':
        formattedDate += getMeridiem(jate)
        break
      case 'aa':
      case 'a':
        formattedDate += getMeridiem(jate).toUpperCase()
        break
      // Hour formatting
      case 'hh':
        formattedDate += formatNumber(getHour(jate.getHours(), 1, 12))
        break
      case 'ho':
        formattedDate += getOrdinalNumber(getHour(jate.getHours(), 1, 12))
        break
      case 'h':
        formattedDate += getHour(jate.getHours(), 1, 12)
        break
      case 'HH':
        formattedDate += formatNumber(getHour(jate.getHours(), 0, 23))
        break
      case 'Ho':
        formattedDate += getOrdinalNumber(getHour(jate.getHours(), 0, 23))
        break
      case 'H':
        formattedDate += getHour(jate.getHours(), 0, 23)
        break
      case 'kk':
        formattedDate += formatNumber(getHour(jate.getHours(), 1, 24))
        break
      case 'ko':
        formattedDate += getOrdinalNumber(getHour(jate.getHours(), 1, 24))
        break
      case 'k':
        formattedDate += getHour(jate.getHours(), 1, 24)
        break
      // Minute formatting
      case 'mm':
        formattedDate += formatNumber(jate.getMinutes())
        break
      case 'mo':
        formattedDate += getOrdinalNumber(jate.getMinutes())
        break
      case 'm':
        formattedDate += jate.getMinutes()
        break
      // Second formatting
      case 'ss':
        formattedDate += formatNumber(jate.getSeconds())
        break
      case 'so':
        formattedDate += getOrdinalNumber(jate.getSeconds())
        break
      case 's':
        formattedDate += jate.getSeconds()
        break
      // Milliseconds
      case 'SSS':
        formattedDate += formatNumber(jate.getMilliseconds(), 3)
        break
      case 'SS':
        formattedDate += formatNumber(jate.getMilliseconds())
        break
      case 'S':
        formattedDate += jate.getMilliseconds()
        break
    }
  }

  return formattedDate
}
