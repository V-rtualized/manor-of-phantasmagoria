import { GuildMember, Snowflake } from 'discord.js'
import { Player } from '../schemas/database'
import { Pool } from 'pg'
import { gameCharacterDataFromName } from '../characters'

export type DBPlayer = {
  id: Snowflake,
  room: string,
  location: string,
  inventory: number,
  character: string
}

const Database = {
	membersToPlayers: async (members: GuildMember[]): Promise<Player[]> => {
		const players: Player[] = []

		const pool = new Pool({
			host: 'db',
			password: process.env.POSTGRES_PASSWORD,
		})

		const client = await pool.connect()

		try {
			for (const member of members) {
				const query = {
					text: 'SELECT * FROM Player WHERE id = $1',
					values: [member.user.id],
				}

				const result: { rows: DBPlayer[] } = await client.query(query)

				if (result.rows.length > 0) {
					const gameCharacter = gameCharacterDataFromName(result.rows[0].character)
					if (gameCharacter === undefined) {
						throw new Error('Game Character not found')
					}
					const player: Player = { ...result.rows[0], character: gameCharacter }
					players.push(player)
				}
			}
		}
		finally {
			client.release()
		}

		return players
	},
}

export default Database
