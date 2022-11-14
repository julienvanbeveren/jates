export function getHour(hour: number, min: number, max: number) {
  if (hour > max) {
    return min + (hour - max - 1)
  }
  if (hour < min) {
    return min
  }
  return hour
}
