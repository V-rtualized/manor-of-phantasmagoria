import { isNotNull } from '../typeUtils'

describe('typeUtils - isNotNull', () => {
	test('returns true for non-null values', () => {
		expect(isNotNull(undefined)).toBe(true)
		expect(isNotNull(0)).toBe(true)
		expect(isNotNull('')).toBe(true)
		expect(isNotNull(false)).toBe(true)
		expect(isNotNull([])).toBe(true)
		expect(isNotNull({})).toBe(true)
	})

	test('returns false for null', () => {
		expect(isNotNull(null)).toBe(false)
	})
})
