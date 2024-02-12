import Discord from './Discord'
import { color } from '../utils/colorUtils'
import Database from './Database'

export type States = 'PREGAME' | 'INVITING' | 'STARTING' | 'DAY' | 'NIGHT' | 'ENDED'

const unixEpochInSeconds = () => Math.round(Date.now() / 1000)

// The started variable is being used for multiple reasons depending on the state
// PREGAME - time since reset
// INVITING - time since invite message went up
// STARTED - time since the game started
// ENDED - time since someone won
class GameState {
	_state: States
	_started: number

	constructor() {
		this._state = 'PREGAME'
		this._started = unixEpochInSeconds()
	}

	restore = async () => {
		const state = await Database.getState()
		if (state === undefined) return
		this._state = state.name
		this._started = state.started
		console.log(color('primary', `GameState restored to ${color('secondary', state)}`))
	}

	get state() {
		return this._state
	}

	get started() {
		return this._started
	}

	_setState = async (newState: States, aliveMeaning: string, deadMeaning: string, save: boolean) => {
		this._state = newState
		this._started = unixEpochInSeconds()
		Discord.updateGrandfatherClock(this._state, this._started, [
			{ status: aliveMeaning, players: (await Discord.getMembersByRole('ALIVE')).map(m => m.displayName) },
			{ status: deadMeaning, players: (await Discord.getMembersByRole('DEAD')).map(m => m.displayName) },
		])
		if (save) Database.setState({ name: this._state, started: this._started })
	}

	invite = async () => {
		await this._setState('INVITING', 'Players', 'Spectators', true)
	}

	start = async () => {
		await this._setState('STARTING', 'Players', 'Spectators', true)
		await Discord.createGameRoles()
		await Discord.createGameChannels()
		await this._setState('DAY', 'Alive', 'Dead', true)
	}

	end = async () => {
		await this._setState('ENDED', 'Winners', 'Losers', true)
	}

	reset = async () => {
		await Discord.deleteAllMutableChannels()
		await Discord.deleteAllMutableRoles()
		await this._setState('PREGAME', 'Players', 'Spectators', true)
	}
}

const GameStateInstance = new GameState()

export default GameStateInstance