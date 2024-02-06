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
		Discord.client = client
		Database.initSchema().then(() => console.log(color('text', 'Successfully connect to database'))).catch(console.error)
		const oldState = await Database.getState()
		initializeState({
			players: await Discord.getPlayersCollection(),
			started: oldState === null ? Math.round(Date.now() / 1000) : oldState.started,
			state: oldState === null ? 'PREGAME' : oldState.state,
		})
	},
}

export default event