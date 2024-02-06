import { Collection, Snowflake } from 'discord.js'
import { Player } from '../schemas/database'
import Discord from './Discord'
import Database from './Database'
import { color } from '../functions'

// The status variable is being used for multiple reasons depending on the state
// PREGAME - all players are dead
// INVITING - alive players accepted, dead players denied
// STARTED - alive players are alive, dead players are dead or never joined
// ENDED - alive players won, dead players lost
type PlayerStatus = 'ALIVE' | 'DEAD'

class PlayerState {
	_players: Collection<Snowflake, Player> = new Collection<Snowflake, Player>()
	_status: Collection<Snowflake, PlayerStatus> = new Collection<Snowflake, PlayerStatus>()

	restore = async () => {
		const members = await Discord.getMembers()

		for (const [id, member] of members) {
			if (this._players.get(id) === undefined) {
				const player = await Database.getPlayer(id)
				if (player === null) continue
				this._players.set(id, player)
				const role = member.roles.cache.find((r) => [process.env.ALIVE_ROLE, process.env.DEAD_ROLE].includes(r.id))
				if (role === undefined) {
					member.roles.add(process.env.DEAD_ROLE)
					this._status.set(id, 'DEAD')
				}
				else if (role.id === process.env.DEAD_ROLE) {
					this._status.set(id, 'DEAD')
				}
				else {
					this._status.set(id, 'ALIVE')
				}
			}
		}

		console.log(color('text', `PlayerState restored with ${color('variable', this._players.size)} players`))
	}

	getPlayersByStatus = (status: PlayerStatus): Player[] => {
		const returnPlayers: Player[] = []

		for (const id of this._status.filter((value) => value === status).keys()) {
			const player = this._players.get(id)
			if (player === undefined) throw new Error('Player in status but not players (getPlayersByStatus)')
			returnPlayers.push(player)
		}

		return returnPlayers
	}
}

const PlayerStateInstance = new PlayerState()

export default PlayerStateInstance