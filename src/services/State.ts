import { Collection, Snowflake } from 'discord.js'

type States = 'PREGAME' | 'INVITING' | 'STARTING' | 'DAY' | 'NIGHT' | 'ENDED'

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

	invite = () => {
		this._state = 'INVITING'
		this._started = unixEpochInSeconds()
	}

	start = () => {
		this._state = 'STARTING'
		this._started = unixEpochInSeconds()
		this._state = 'DAY'
		this._started = unixEpochInSeconds()
	}

	end = () => {
		this._state = 'ENDED'
		this._started = unixEpochInSeconds()
	}

	reset = () => {
		this._state = 'PREGAME'
		this._started = unixEpochInSeconds()
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

	set stateInstance(input: StateInput) {
		this._stateInstance = new State(input)
	}

}

const gsi = new GlobalStateInstance()

export default gsi.stateInstance
export const initializeState = (input: StateInput) => gsi.stateInstance = input