import { formatNumber } from '../src/utils'
import { numberBetween } from './helpers'

test('testing formatNumber', () => {
  const oneDigit = numberBetween(0, 10)
  expect(formatNumber(oneDigit)).toBe('0' + String(oneDigit))
  expect(formatNumber(oneDigit, 1)).toBe(String(oneDigit))

  const twoDigits = numberBetween(10, 100)
  expect(formatNumber(twoDigits)).toBe(String(twoDigits))
  expect(formatNumber(twoDigits, 1)).toBe(String(twoDigits))
  expect(formatNumber(twoDigits, 5)).toBe('000' + String(twoDigits))
})
