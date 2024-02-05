import { Client, Collection, Snowflake } from 'discord.js'
import Discord from './Discord'
import { color } from '../functions'

export type States = 'PREGAME' | 'INVITING' | 'STARTING' | 'DAY' | 'NIGHT' | 'ENDED'

// The started and players states are being used for multiple reasons depending on the state
// PREGAME - time since reset - all players are dead
// INVITING - time since invite message went up - alive players accepted, dead players denied
// STARTED - time since the game started - alive players are alive, dead players are dead or never joined
// ENDED - time since someone won - alive players won, dead players lost
type StateInput = {
  state: States
  started: number
  players: Collection<Snowflake, 'ALIVE' | 'DEAD'>
}

const unixEpochInSeconds = () => Math.round(Date.now() / 1000)

class State {
	_state: States
	_started: number
	_players: Collection<Snowflake, 'ALIVE' | 'DEAD'>

	constructor(input: StateInput) {
		this._state = input.state
		this._started = input.started
		this._players = input.players
	}

	_setState = async (client: Client, newState: States, aliveMeaning: string, deadMeaning: string) => {
		this._state = newState
		this._started = unixEpochInSeconds()
		Discord.updateGrandfatherClock(client, this._state, this._started, [
			{ status: aliveMeaning, players: (await Discord.getMembersByRole(client, 'ALIVE')).map(m => m.displayName) },
			{ status: deadMeaning, players: (await Discord.getMembersByRole(client, 'DEAD')).map(m => m.displayName) },
		])
	}

	invite = async (client: Client) => {
		await this._setState(client, 'INVITING', 'Players', 'Spectators')
	}

	start = async (client: Client) => {
		await this._setState(client, 'STARTING', 'Players', 'Spectators')
		await Discord.createGameRoles(client)
		await Discord.createGameChannels(client)
		await this._setState(client, 'DAY', 'Alive', 'Dead')
	}

	end = async (client: Client) => {
		await this._setState(client, 'ENDED', 'Winners', 'Losers')
	}

	reset = async (client: Client) => {
		await Discord.deleteAllMutableChannels(client)
		await Discord.deleteAllMutableRoles(client)
		await this._setState(client, 'PREGAME', 'Players', 'Spectators')
	}

	get state() {
		return this._state
	}

	isAlive = (id: Snowflake): boolean => this._players.get(id) === 'ALIVE'
}

class GlobalStateInstance {

	private _stateInstance: State | null = null

	get stateInstance(): State | null {
		return this._stateInstance
	}

	setStateInstance(input: StateInput) {
		this._stateInstance = new State(input)
	}

}

const gsi = new GlobalStateInstance()


export const getStateInstance = () => gsi.stateInstance
export const initializeState = (input: StateInput) => {
	console.log(color('text', `State initialized as ${color('variable', input.state)}`))
	gsi.setStateInstance(input)
}