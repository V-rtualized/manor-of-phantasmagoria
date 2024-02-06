import { GuildMember, Snowflake } from 'discord.js'
import { Inventory, Player } from '../schemas/database'
import { Pool, PoolClient, PoolConfig } from 'pg'
import { gameCharacterDataFromName } from '../characters'
import { States } from './GameState'
import { color } from '../functions'

export type DBPlayer = {
  id: Snowflake,
	alive: boolean,
  room: string,
  location: string,
  inventory: number,
  character: string,
	characterData: string,
}

export type DBGameState = {
  state: States,
	started: number
}

const poolConfig: PoolConfig = {
	host: 'db',
	user: 'postgres',
	database: 'postgres',
	password: process.env.POSTGRES_PASSWORD,
}

const bitsToInventory = (bits: number): Inventory => {
	const bitStr = bits.toString()
	return {
		master: bitStr.at(0) === '1',
		servant: bitStr.at(1) === '1',
		library: bitStr.at(2) === '1',
	}
}

// eslint-disable-next-line no-unused-vars
const usePool = async (fn: (client: PoolClient) => Promise<any> | any) => {
	const pool = new Pool(poolConfig)
	const client = await pool.connect()
	let returnValue: any = undefined
	try {
		returnValue = await fn(client)
	}
	catch (err) {
		client.release()
		throw err
	}
	client.release()
	return returnValue
}

const Database = {
	setPlayer: async (player: Player) => {
		const inventoryToBits = (inv: Inventory) => `${inv.master ? '1' : '0'}${inv.servant ? '1' : '0'}${inv.library ? '1' : '0'}`

		usePool(async (client: PoolClient) => {
			await client.query(`
				INSERT INTO Player (id, room, location, inventory, character, characterData)
				VALUES ('${player.id}', '${player.room}', '${player.location}', ${inventoryToBits(player.inventory)}, '${player.character.name}', '${player.characterData}')
				ON CONFLICT (id)
				DO UPDATE SET room = '${player.room}', location = '${player.location}', inventory = ${inventoryToBits(player.inventory)}, character = '${player.character.name}', characterData = '${player.characterData}';
			`)
		})
	},
	getPlayer: async (id: Snowflake): Promise<Player | null> => {
		const player: DBPlayer = await usePool(async (client: PoolClient) => (await client.query(`
				SELECT * FROM Player
				WHERE id = '${id}';
			`)).rows[0])

		if (player === undefined) return null

		const character = gameCharacterDataFromName(player.character)

		if (character === undefined) throw new Error('Player has undefined character')

		return { ...player, inventory: bitsToInventory(player.inventory), character: character }
	},
	setState: async (state: DBGameState) => {
		usePool(async (client: PoolClient) => {
			await client.query(`
				INSERT INTO State (version, stateName, started)
				VALUES (0.1, '${state.state}', ${state.started})
				ON CONFLICT (version)
				DO UPDATE SET stateName = '${state.state}', started = ${state.started};
			`)
		})
	},
	getState: async (): Promise<DBGameState | null> => {
		const gameState: { statename: States, started: number } | undefined = await usePool(async (client: PoolClient) => (await client.query(`
				SELECT * FROM State
				WHERE version = '0.1';
			`)).rows[0])

		if (gameState === undefined) {
			return null
		}

		return { ...gameState, state: gameState.statename }
	},
	resetSchema: async () => {
		usePool(async (client: PoolClient) => {
			await client.query(`
				DROP TABLE Player;
			`)
		})
	},
	resetDB: async () => {
		usePool(async (client: PoolClient) => {
			await client.query(`
				DROP TABLE Player;
			`)
			await client.query(`
				DROP TABLE State;
			`)
		})
	},
	initSchema: async () => {
		usePool(async (client: PoolClient) => {
			await client.query(`
				CREATE TABLE IF NOT EXISTS Player (
					id VARCHAR(255) PRIMARY KEY,
					alive BOOLEAN,
					room VARCHAR(255),
					location VARCHAR(255),
					inventory BIT(3),
					character VARCHAR(255),
					characterData VARCHAR(255)
				);
			`)
			await client.query(`
				CREATE TABLE IF NOT EXISTS State (
					version FLOAT PRIMARY KEY,
					stateName VARCHAR(255),
					started INT
				);
			`)
		})
		console.log(color('text', 'Successfully connect to database'))
	},
	membersToPlayers: async (members: GuildMember[]): Promise<Player[]> => {
		const players: Player[] = []

		usePool(async (client: PoolClient) => {
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
					const player: Player = { ...result.rows[0], inventory: bitsToInventory(result.rows[0].inventory), character: gameCharacter }
					players.push(player)
				}
			}
		})

		return players
	},
}

Database.initSchema()

export default Database
