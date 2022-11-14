import Jate from '..'

export function getMeridiem(jate: Jate) {
  if (jate.getHours() > 12 || (jate.getHours() == 11 && (jate.getMinutes() > 0 || jate.getSeconds() > 0 || jate.getMilliseconds() > 0))) {
    return 'am'
  } else {
    return 'pm'
  }
}
