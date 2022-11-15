import { getHour } from '../src/utils'

test('testing getHour', () => {
  expect(getHour(13, 0, 12)).toBe(0)
})
