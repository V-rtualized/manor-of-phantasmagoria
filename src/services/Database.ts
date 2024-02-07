import { promises as fs } from 'fs'
import path from 'path'
import { Pool, PoolConfig } from 'pg'
import { States } from './GameState'
import {
	ColumnType,
	FileMigrationProvider,
	Insertable,
	Kysely,
	Migrator,
	NO_MIGRATIONS,
	PostgresDialect,
	Updateable,
} from 'kysely'
import { color } from '../functions'
import { PlayerStatus } from './PlayerState'

const VERSION = 0.1

const poolConfig: PoolConfig = {
	host: 'db',
	user: 'postgres',
	database: 'postgres',
	password: process.env.POSTGRES_PASSWORD,
}

type DatabaseSchema = {
  player: PlayerTable
  state: StateTable
  location: LocationTable
  inventory: InventoryTable
}

export interface PlayerTable {
  id: ColumnType<string, string, never>
	is_alive: ColumnType<boolean, boolean | undefined, boolean>
  starting_room: string | undefined
  current_location: string | undefined
  inventory: number | undefined
  character: string | undefined
	action: string | undefined
}

type PlayerUpdate = Updateable<PlayerTable>

export interface StateTable {
  version: ColumnType<number, number, never>
  name: States
	started: number
}

type SetState = {
	name: States
	started: number
}

export interface LocationTable {
  name: ColumnType<string, string, never>
  to: string
  private: boolean
  key: string | undefined
}

type NewLocation = Insertable<LocationTable>
type LocationUpdate = Updateable<LocationTable>

export interface InventoryTable {
  id: ColumnType<number, never, never>
  keyM: boolean
  keyS: boolean
  keyL: boolean
}

type NewInventory = Insertable<InventoryTable>

const pool = new Pool(poolConfig)
const dialect = new PostgresDialect({
	pool,
})

class Database {
	db: Kysely<DatabaseSchema>

	constructor() {
		this.db = new Kysely<DatabaseSchema>({
			dialect,
		})
	}

	migrate = async () => {
		const migrator = new Migrator({
			db: this.db,
			provider: new FileMigrationProvider({ fs, path, migrationFolder: path.join(__dirname, '../migrations') }),
			allowUnorderedMigrations: true,
		})
		const { error, results } = await migrator.migrateToLatest()

		results?.forEach((it) => {
			if (it.status === 'Success') {
				console.log(color('text', `Migration ${color('variable', it.migrationName)} was executed successfully`))
			}
			else if (it.status === 'Error') {
				console.error(`Failed to execute migration "${it.migrationName}"`)
			}
		})

		if (error) {
			console.error('Failed to migrate')
			console.error(error)
			process.exit(1)
		}
	}
	reset = async () => {
		const migrator = new Migrator({
			db: this.db,
			provider: new FileMigrationProvider({ fs, path, migrationFolder: path.join(__dirname, '../migrations') }),
			allowUnorderedMigrations: true,
		})
		const { error, results } = await migrator.migrateTo(NO_MIGRATIONS)

		results?.forEach((it) => {
			if (it.status === 'Success') {
				console.log(color('text', `Migration ${color('variable', it.migrationName)} was executed successfully`))
			}
			else if (it.status === 'Error') {
				console.error(`Failed to execute migration "${it.migrationName}"`)
			}
		})

		if (error) {
			console.error('Failed to migrate')
			console.error(error)
			process.exit(1)
		}

		await this.migrate()
	}
	setPlayer = async (id: string, player: PlayerUpdate) => {
		try {
			await this.db.insertInto('player')
				.values({ ...player, id })
				.onConflict((oc) => oc.column('id').doUpdateSet(player))
				.execute()
		}
		catch (err) {
			console.error(err)
		}
	}
	getPlayer = async (id: string) => {
		try {
			return await this.db.selectFrom('player')
				.selectAll()
				.where('id', '=', id)
				.executeTakeFirst()
		}
		catch (err) {
			console.error(err)
		}
	}
	setPlayerStatus = async (id: string, status: PlayerStatus) => {
		await this.setPlayer(id, { is_alive: status === 'ALIVE' })
	}
	/**
	 * @returns 'ALIVE' or 'DEAD', also returns 'DEAD' if player is not found
	 */
	getPlayerStatus = async (id: string): Promise<PlayerStatus> => (await this.getPlayer(id))?.is_alive ? 'ALIVE' : 'DEAD'
	setInventory = async (player_id: string, inv: NewInventory) => {
		try {
			const inv_id = (await this.db.selectFrom('player')
				.select('inventory')
				.where('id', '=', player_id)
				.executeTakeFirst())?.inventory
			if (inv_id === undefined) {
				const new_inv_id = (await this.db.insertInto('inventory')
					.values(inv)
					.returning('id')
					.executeTakeFirst())?.id
				await this.setPlayer(player_id, { inventory: new_inv_id })
			}
			else {
				(await this.db.updateTable('inventory')
					.set(inv)
					.executeTakeFirst())
			}
		}
		catch (err) {
			console.error(err)
		}
	}
	getInventory = async (player_id: string) => {
		try {
			const inv_id = (await this.db.selectFrom('player')
				.select('inventory')
				.where('id', '=', player_id)
				.executeTakeFirst())?.inventory
			if (inv_id === undefined) return undefined
			return await this.db.selectFrom('inventory')
				.selectAll()
				.where('id', '=', inv_id)
				.executeTakeFirst()
		}
		catch (err) {
			console.error(err)
		}
	}
	setLocation = async (name: string, location: LocationUpdate) => {
		try {
			const newLoc = { ...location, name }
			if (newLoc.to === undefined) {
				throw new Error('Cannot set location without "to" property')
			}
			await this.db.insertInto('location')
				.values(newLoc as NewLocation)
				.onConflict((oc) => oc.column('name').doUpdateSet(location))
				.execute()
		}
		catch (err) {
			console.error(err)
		}
	}
	getLocation = async (name: string) => {
		try {
			return await this.db.selectFrom('location')
				.selectAll()
				.where('name', '=', name)
				.executeTakeFirst()
		}
		catch (err) {
			console.error(err)
		}
	}
	setState = async (state: SetState) => {
		await this.db.insertInto('state')
			.values({ ...state, version: VERSION })
			.onConflict((oc) => oc.column('version').doUpdateSet(state))
			.execute()
	}
	getState = async () => await this.db.selectFrom('state')
		.selectAll()
		.where('version', '=', VERSION)
		.executeTakeFirst()
}

const DatabaseInstance = new Database()

export default DatabaseInstance