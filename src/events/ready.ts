import { Client, Events } from 'discord.js'
import { BotEvent } from '../types'
import { color } from '../functions'
import { initializeState } from '../services/GameState'
import Discord from '../services/Discord'
import Database from '../services/Database'

const event : BotEvent = {
	name: Events.ClientReady,
	once: true,
	execute: async (client : Client) => {
		console.log(
			color('text', `Logged in as ${color('variable', client.user?.tag)}`),
		)
		await Database.resetSchema()
		Database.initSchema().then(() => console.log(color('text', 'Successfully connect to database'))).catch(console.error)
		initializeState({
			players: await Discord.getPlayersCollection(client),
			started: Math.round(Date.now() / 1000),
			state: 'PREGAME',
		})
	},
}

export default event