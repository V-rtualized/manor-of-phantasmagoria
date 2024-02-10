import { Client, Events } from 'discord.js'
import { BotEvent } from '../types'
import { color } from '../functions'
import GameState from '../services/GameState'
import Discord from '../services/Discord'
import Database from '../services/Database'
import PlayerState from '../services/PlayerState'

const executeAsync = async (client: Client) => {
	// Discord Init
	Discord.client = client

	// Database Init
	try {
		await Database.migrate()
	}
	catch (err) {
		console.error('readyEvent', err)
	}

	// GameState Init
	await GameState.restore()

	// PlayerState Init
	await PlayerState.restore()
	console.log(
		color('variable', 'INITIALIZATION DONE'),
	)
}

/**
 * IMPORTANT:
 * This function initializes the various services but these services can depend on eachother
 * Dependee -> ...Dependants
 *
 * GameState -> Discord, Database
 * PlayerState -> Discord, Database
 */
const event : BotEvent = {
	name: Events.ClientReady,
	once: true,
	execute:  (client: Client) => {
		console.log(
			color('text', `Logged in as ${color('variable', client.user?.tag)}`),
		)

		executeAsync(client).then()
	},
}

export default event