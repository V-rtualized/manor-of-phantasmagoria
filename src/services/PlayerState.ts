import { Collection, Snowflake } from 'discord.js'
import Discord from './Discord'
import Database from './Database'
import { color } from '../functions'
import { GameCharacterData } from '../characters/GameCharacter'
import { gameCharacterDataFromName } from '../characters'

// The status variable is being used for multiple reasons depending on the state
// PREGAME - all players are dead
// INVITING - alive players accepted, dead players denied
// STARTED - alive players are alive, dead players are dead or never joined
// ENDED - alive players won, dead players lost
export type PlayerStatus = 'ALIVE' | 'DEAD'

export type Player = {
  id: Snowflake,
  starting_room: string | undefined
  current_location: string | undefined
  inventory: Inventory | undefined
  character: GameCharacterData | undefined
	action: string | undefined
}

export type Inventory = {
	id: number
	keyM: boolean
	keyS: boolean
	keyL: boolean
}

class PlayerState {
	_players: Collection<Snowflake, Player> = new Collection<Snowflake, Player>()
	_status: Collection<Snowflake, PlayerStatus> = new Collection<Snowflake, PlayerStatus>()

	getPlayers = () => this._players.values()

	getPlayer = (id: Snowflake) => this._players.get(id)

	setPlayer = (id: Snowflake, data: Player) => {
		this.setPlayer(id, data)
		// Database.setPlayer(id, data)
	}

	getStatuses = () => this._status.values()

	getStatus = (id: Snowflake) => this._status.get(id)

	setStatus = (id: Snowflake, status: PlayerStatus) => Database.setPlayerStatus(id, status)

	restore = async () => {
		const members = await Discord.getMembers()

		for (const [id] of members) {
			if (this.getPlayer(id) === undefined) {
				const player = await Database.getPlayer(id)
				if (player === undefined) continue
				const gc = gameCharacterDataFromName(player.character ? player.character : '')
				const inv = await Database.getInventory(id)
				this.setPlayer(id, { ...player, inventory: inv, character: gc ? gc : undefined })
				const status = await Database.getPlayerStatus(id)
				if (status === null) continue
				this.setStatus(id, status)
			}
		}

		console.log(color('text', `PlayerState restored with ${color('variable', this._players.size)} players`))
	}

	collectPlayerStatus = async () => {
		const members = await Discord.getMembers()

		for (const [id, member] of members) {
			const role = member.roles.cache.find((r) => [process.env.ALIVE_ROLE, process.env.DEAD_ROLE].includes(r.id))
			if (role === undefined) {
				member.roles.add(process.env.DEAD_ROLE)
					.then(() => console.log('PlayerState.collectPlayerStatus', color('text', `Found ${color('variable', member.displayName)} with empty status, assigned ${color('variable', 'DEAD')} role`)))
				this.setStatus(id, 'DEAD')
			}
			else if (role.id === process.env.DEAD_ROLE) {
				this.setStatus(id, 'DEAD')
			}
			else if (role.id === process.env.ALIVE_ROLE) {
				this.setStatus(id, 'ALIVE')
			}
		}
	}

	setPlayerStatus = async (id: Snowflake, status: PlayerStatus) => {
		const member = await Discord.getMember(id)
		member.roles.add(status === 'ALIVE' ? process.env.ALIVE_ROLE : process.env.DEAD_ROLE)
		this.setStatus(id, status)
	}

	getPlayersByStatus = (status: PlayerStatus): Player[] => {
		const returnPlayers: Player[] = []

		for (const id of this._status.filter((value) => value === status).keys()) {
			const player = this.getPlayer(id)
			if (player === undefined) throw new Error('Player in status but not players (getPlayersByStatus)')
			returnPlayers.push(player)
		}

		return returnPlayers
	}
}

const PlayerStateInstance = new PlayerState()

export default PlayerStateInstance