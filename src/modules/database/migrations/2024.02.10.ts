import { Kysely } from 'kysely'

export const up = async (db: Kysely<any>): Promise<void> => {
	await db.schema
		.createTable('GameState')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('phase', 'varchar', (col) => col.notNull())
		.addColumn('phase_start', 'timestamp', (col) => col.defaultTo('now()'))
		.execute()

	await db.schema
		.createTable('Characters')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('name', 'varchar', (col) => col.notNull())
		.addColumn('team', 'varchar', (col) => col.notNull())
		.addColumn('position', 'varchar', (col) => col.notNull())
		.addColumn('color', 'varchar', (col) => col.notNull())
		.execute()

	await db.schema
		.createTable('Locations')
		.addColumn('name', 'varchar', (col) => col.primaryKey())
		.addColumn('accessible_locations', 'jsonb')
		.addColumn('is_private', 'boolean', (col) => col.notNull())
		.addColumn('requires_key', 'boolean', (col) => col.notNull())
		.execute()

	await db.schema
		.createTable('Players')
		.addColumn('discord_id', 'varchar', (col) => col.primaryKey())
		.addColumn('status', 'varchar', (col) => col.notNull())
		.addColumn('start_room', 'varchar', (col) => col.references('Locations.name'))
		.addColumn('current_location', 'varchar', (col) => col.references('Locations.name'))
		.addColumn('inventory', 'jsonb')
		.addColumn('character_id', 'integer', (col) => col.references('Characters.id'))
		.addColumn('action', 'varchar')
		.execute()
}

export const down = async (db: Kysely<any>): Promise<void> => {
	await db.schema.dropTable('Players').execute()
	await db.schema.dropTable('Locations').execute()
	await db.schema.dropTable('Characters').execute()
	await db.schema.dropTable('GameState').execute()
}
