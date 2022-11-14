import Jate from '..'

export function getNextMonthNumber(jate: Jate) {
  return jate.getMonth() + 1 > 11 ? 0 : jate.getMonth() + 1
}
