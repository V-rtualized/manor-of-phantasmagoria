import { FileMigrationProvider, Kysely, Migrator, NO_MIGRATIONS, PostgresDialect } from 'kysely'
import { Pool, PoolConfig } from 'pg'
import { Character, Criteria, Database, GameState, Location, Player, Tables } from './dbTypes'
import { color } from '../../utils/colorUtils'
import path from 'path'
import { promises as fs } from 'fs'

type DbOperation = () => Promise<any>;

const operationQueue: DbOperation[] = []
let isProcessingQueue = false

/**
 * This function is exported for tests  but should not be used directly
 * @access private
 */
export const enqueueOperation = (operation: DbOperation) => {
	operationQueue.push(operation)
	if (!isProcessingQueue) {
		processQueue()
	}
}

/**
 * This function is exported for tests  but should not be used directly
 * @access private
 */
export const getIsProcessingQueue = () => isProcessingQueue

const processQueue = async () => {
	isProcessingQueue = true
	while (operationQueue.length > 0) {
		const operation = operationQueue.shift()
		if (operation) {
			try {
				await operation()
			}
			catch (error) {
				console.log(color('error', `Error processing database operation: ${color('secondary', error.message)}`))
			}
		}
	}
	isProcessingQueue = false
}

const poolConfig: PoolConfig = {
	host: 'db',
	user: 'postgres',
	database: 'postgres',
	password: process.env.POSTGRES_PASSWORD,
}

export const db = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool: new Pool(poolConfig),
	}),
})

export const get = async <T extends Partial<GameState | Player | Location | Character>> (table: Tables, criteria: Criteria): Promise<T | null> => new Promise((resolve, reject) => {
	enqueueOperation(async () => {
		try {
			const result = await db
				.selectFrom(table)
				.selectAll()
				.where(criteria.lhs, criteria.op, criteria.rhs)
				.executeTakeFirst()
			resolve(result as T | null)
		}
		catch (err) {
			reject(err)
		}
	})
})

export const set = async <T extends Partial<GameState | Player | Location | Character>> (table: Tables, data: T, criteria: Criteria): Promise<void> => new Promise((resolve, reject) => {
	enqueueOperation(async () => {
		try {
			const exists = await db
				.selectFrom(table)
				.selectAll()
				.where(criteria.lhs, criteria.op, criteria.rhs)
				.executeTakeFirst()

			if (exists) {
				await db.updateTable(table).set(data).where(criteria.lhs, criteria.op, criteria.rhs).execute()
			}
			else {
				await db.insertInto(table).values(data).execute()
			}
			resolve()
		}
		catch (err) {
			reject(err)
		}
	})
})

export const migrate = async () => new Promise<void>((resolve, reject) => {
	const migrator = new Migrator({
		db: db,
		provider: new FileMigrationProvider({ fs, path, migrationFolder: path.join(__dirname, './migrations') }),
		allowUnorderedMigrations: true,
	})

	migrator.migrateToLatest().then(({ error, results }) => {
		results?.forEach((it) => {
			if (it.status === 'Success') {
				console.log(color('primary', `Migration ${color('secondary', it.migrationName)} was executed successfully`))
			}
			else if (it.status === 'Error') {
				console.log(color('error', `Failed to execute migration "${it.migrationName}"`))
				reject(error)
			}
		})

		if (error) {
			reject(error)
		}

		resolve()
	})
})

export const reset = async () => new Promise<void>((resolve, reject) => {
	const migrator = new Migrator({
		db: db,
		provider: new FileMigrationProvider({ fs, path, migrationFolder: path.join(__dirname, './migrations') }),
		allowUnorderedMigrations: true,
	})

	migrator.migrateTo(NO_MIGRATIONS).then(({ error, results }) => {
		results?.forEach((it) => {
			if (it.status === 'Success') {
				console.log(color('primary', `Migration ${color('secondary', it.migrationName)} was executed successfully`))
			}
			else if (it.status === 'Error') {
				console.log('error', `Failed to execute migration "${it.migrationName}"`)
				reject(error)
			}
		})

		if (error) {
			reject(error)
		}

		resolve()
	})
})