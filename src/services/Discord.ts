import { Client, GuildMember } from 'discord.js'
import { Role } from '../schemas/discord'

const Discord = {
	getAliveUsersByRole: async (client: Client, role: Role): Promise<GuildMember[]> => {
		const guild = await client.guilds.fetch(process.env.GUILD_ID)
		const aliveRole = await guild.roles.fetch(role === 'ALIVE' ? process.env.ALIVE_ROLE : process.env.DEAD_ROLE)

		if (aliveRole === null) {
			throw new Error('Cannot find role')
		}

		return aliveRole.members.map(value => value)
	},
}

export default Discord