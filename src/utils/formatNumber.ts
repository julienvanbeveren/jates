export function formatNumber(number: number, digits: number = 2) {
  const numberString = number.toString()
  return numberString.length > digits - 1 ? numberString : '0'.repeat(digits - numberString.length) + numberString
}
