import chalk from 'chalk'
import { GuildMember, PermissionFlagsBits, PermissionResolvable, TextChannel } from 'discord.js'

type colorType = 'primary' | 'secondary' | 'error'

const themeColors = {
	primary: '#4036d1',
	secondary: '#9727ff',
	error: '#f5426c',
}

export const getThemeColor = (color: colorType) => Number(`0x${themeColors[color].substring(1)}`)

export const color = (c: colorType, message: any) => chalk.hex(themeColors[c])(message)

export const checkPermissions = (member: GuildMember, permissions: Array<PermissionResolvable>) => {
	const neededPermissions: PermissionResolvable[] = []
	permissions.forEach(permission => {
		if (!member.permissions.has(permission)) neededPermissions.push(permission)
	})
	if (neededPermissions.length === 0) return null
	return neededPermissions.map(p => {
		if (typeof p === 'string') return p.split(/(?=[A-Z])/).join(' ')
		else return Object.keys(PermissionFlagsBits).find(k => Object(PermissionFlagsBits)[k] === p)?.split(/(?=[A-Z])/).join(' ')
	})
}

export const sendTimedMessage = (message: string, channel: TextChannel, duration: number) => {
	channel.send(message)
		.then(m =>
			setTimeout(() => {
				channel.messages.fetch(m).then(res => res.delete())
			}, duration))
}