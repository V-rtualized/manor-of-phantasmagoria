import { Client } from 'discord.js'
import { readdirSync } from 'fs'
import { join } from 'path'
import { color } from '../functions'
import { BotEvent } from '../types'

module.exports = (client: Client) => {
	const eventsDir = join(__dirname, '../events')

	readdirSync(eventsDir).forEach(file => {
		if (!file.endsWith('.js')) return
		const event: BotEvent = require(`${eventsDir}/${file}`).default
		event.once ?
			client.once(event.name, (...args) => event.execute(client, ...args))
			:
			client.on(event.name, (...args) => event.execute(client, ...args))
		console.log(color('primary', `Successfully loaded event ${color('secondary', event.name)}`))
	})
}
