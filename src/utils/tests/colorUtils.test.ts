import { getThemeColor, color, colorType } from '../colorUtils'

jest.mock('chalk', () => ({
	hex: jest.fn().mockImplementation((colorStr) => (msg: string) => `Mocked ${colorStr} message: ${msg}`),
}))

describe('colorUtils - getThemeColor', () => {
	test.each([
		['primary', 0x4036d1],
		['secondary', 0x9727ff],
		['error', 0xf5426c],
	])('converts color name %s to its numeric representation', (colorStr, expected) => {
		expect(getThemeColor(colorStr as colorType)).toBe(expected)
	})
})

describe('colorUtils - color', () => {
	test.each([
		['primary', 'Test Message', 'Mocked #4036d1 message: Test Message'],
		['secondary', 'Another Test', 'Mocked #9727ff message: Another Test'],
		['error', 'Error Message', 'Mocked #f5426c message: Error Message'],
	])('applies %s theme color to message', (colorStr, message, expected) => {
		expect(color(colorStr as colorType, message)).toBe(expected)
	})
})
