import { Kysely } from 'kysely'

export const up = async (db: Kysely<any>): Promise<void> => {
	await db.schema
		.createTable('location')
		.addColumn('name', 'varchar', (col) => col.primaryKey())
		.addColumn('to', 'varchar', (col) => col.notNull())
		.addColumn('private', 'boolean', (col) => col.defaultTo(false))
		.addColumn('key', 'varchar')
		.execute()

	await db.schema
		.createTable('inventory')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('keyM', 'boolean', (col) => col.defaultTo(false))
		.addColumn('keyS', 'boolean', (col) => col.defaultTo(false))
		.addColumn('keyL', 'boolean', (col) => col.defaultTo(false))
		.execute()

	await db.schema
		.createTable('player')
		.addColumn('id', 'varchar', (col) => col.primaryKey())
		.addColumn('is_alive', 'boolean', (col) => col.defaultTo(false))
		.addColumn('starting_room', 'varchar', (col) => col.references('location.name'))
		.addColumn('current_location', 'varchar', (col) => col.references('location.name'))
		.addColumn('inventory', 'serial', (col) => col.references('inventory.id'))
		.addColumn('character', 'varchar')
		.addColumn('action', 'varchar')
		.execute()

	await db.schema
		.createTable('state')
		.addColumn('version', 'float4', (col) => col.primaryKey())
		.addColumn('name', 'varchar', (col) => col.notNull())
		.addColumn('started', 'integer', (col) => col.notNull())
		.execute()
}

export const down = async (db: Kysely<any>): Promise<void> => {
	await db.schema.dropTable('state').execute()
	await db.schema.dropTable('player').execute()
	await db.schema.dropTable('inventory').execute()
	await db.schema.dropTable('location').execute()
}