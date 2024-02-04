import { Client, Collection, GuildMember, Snowflake } from 'discord.js'
import { Role } from '../schemas/discord'

const Discord = {
	deleteAllMutableChannels: async (client: Client) => {
		const guild = await client.guilds.fetch(process.env.GUILD_ID)
		const channels = await guild.channels.fetch()

		for (const [, channel] of channels) {
			if (channel?.id === process.env.SYSTEM_CATEGORY || channel?.parent?.id === process.env.SYSTEM_CATEGORY) continue

			channel?.delete('Resetting...').catch((err) => console.warn(err.message, ` (deleteAllMutableChannels: ${channel.name})`))
		}
	},
	deleteAllMutableRoles: async (client: Client) => {
		const guild = await client.guilds.fetch(process.env.GUILD_ID)
		const roles = await guild.roles.fetch()

		for (const [id, role] of roles) {
			if (role.name === '@everyone') continue
			if ([process.env.ALIVE_ROLE, process.env.DEAD_ROLE, process.env.MASTER_ROLE, process.env.BOT_ROLE].includes(id)) continue

			role.delete('Resetting...').catch((err) => console.warn(err.message, ` (deleteAllMutableRoles: ${role.name})`))
		}
	},
	getMembersByRole: async (client: Client, role: Role): Promise<GuildMember[]> => {
		const guild = await client.guilds.fetch(process.env.GUILD_ID)
		const aliveRole = await guild.roles.fetch(role === 'ALIVE' ? process.env.ALIVE_ROLE : process.env.DEAD_ROLE)

		if (aliveRole === null) {
			throw new Error('Cannot find role')
		}

		return aliveRole.members.map(value => value)
	},
	getPlayersCollection: async (client: Client): Promise<Collection<Snowflake, 'ALIVE' | 'DEAD'>> => {
		const aliveMembers = await Discord.getMembersByRole(client, 'ALIVE')
		const deadMembers = await Discord.getMembersByRole(client, 'DEAD')

		const collection: Collection<Snowflake, 'ALIVE' | 'DEAD'> = new Collection<Snowflake, 'ALIVE' | 'DEAD'>()
		for (const member of aliveMembers) {
			collection.set(member.user.id, 'ALIVE')
		}
		for (const member of deadMembers) {
			collection.set(member.user.id, 'DEAD')
		}
		return collection
	},
}

export default Discord