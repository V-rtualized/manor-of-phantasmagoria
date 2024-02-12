import chalk from 'chalk'

export type colorType = 'primary' | 'secondary' | 'error'

const themeColors = {
	primary: '#4036d1',
	secondary: '#9727ff',
	error: '#f5426c',
}

export const getThemeColor = (color: colorType) => Number(`0x${themeColors[color].substring(1)}`)

export const color = (c: colorType, message: any) => chalk.hex(themeColors[c])(message)