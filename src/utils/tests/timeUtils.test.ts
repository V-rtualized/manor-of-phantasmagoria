import { unixTimeInSeconds } from '../timeUtils'

describe('timeUtils - unixTimeInSeconds', () => {
	beforeAll(() => {
		jest.spyOn(Date, 'now').mockReturnValue(new Date('2023-01-01T00:00:00Z').getTime())
	})

	afterAll(() => {
		jest.restoreAllMocks()
	})

	test('returns the current Unix time in seconds', () => {
		expect(unixTimeInSeconds()).toBe(Math.floor(new Date('2023-01-01T00:00:00Z').getTime() / 1000))
	})
})
