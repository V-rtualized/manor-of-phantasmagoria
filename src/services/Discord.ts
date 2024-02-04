import { CategoryChannel, ChannelType, Client, Collection, GuildMember, Snowflake } from 'discord.js'
import { Categories, Channels, Role } from '../schemas/discord'

const Discord = {
	createGameChannels: async (client: Client) => {
		const guild = await client.guilds.fetch(process.env.GUILD_ID)
		const members = await Discord.getMembersByRole(client, 'ALIVE')

		const personal = await guild.channels.create({
			name: 'Personal',
			type: ChannelType.GuildCategory,
			position: 1,
			reason: 'Setting up game...',
		})

		personal.permissionOverwrites.create(guild.roles.everyone, {
			ViewChannel: false,
			SendMessages: false,
		})

		const communal = await guild.channels.create({
			name: 'Communal',
			type: ChannelType.GuildCategory,
			position: 2,
			reason: 'Setting up game...',
		})

		communal.permissionOverwrites.create(guild.roles.everyone, {
			SendMessages: false,
		})
		communal.permissionOverwrites.create(process.env.ALIVE_ROLE, {
			SendMessages: true,
		})

		const manor = await guild.channels.create({
			name: 'Manor',
			type: ChannelType.GuildCategory,
			position: 3,
			reason: 'Setting up game...',
		})

		manor.permissionOverwrites.create(guild.roles.everyone, {
			ViewChannel: false,
			Connect: false,
			SendMessages: false,
		})
		manor.permissionOverwrites.create(process.env.ALIVE_ROLE, {
			Connect: true,
		})

		const categoryNameToValue = (name: string) => {
			switch (name) {
			case 'Personal':
				return personal
			case 'Communal':
				return communal
			case 'Manor':
				return manor
			}
		}

		for (const member of members) {
			const createdChannel = await guild.channels.create({
				name: 'personal',
				parent: categoryNameToValue('Personal'),
				type: ChannelType.GuildText,
				reason: 'Setting up game...',
			})
			createdChannel.permissionOverwrites.create(member, {
				ViewChannel: true,
				SendMessages: true,
			})
		}
		for (const channel of Channels) {
			const createdChannel = await guild.channels.create({
				name: channel.name,
				parent: categoryNameToValue(channel.category.name),
				type: channel.type,
				reason: 'Setting up game...',
			})
			switch (channel.permissions) {
			case 'ALIVE':
				createdChannel.permissionOverwrites.create(process.env.ALIVE_ROLE, {
					ViewChannel: true,
					Connect: true,
					SendMessages: true,
				})
				createdChannel.permissionOverwrites.create(process.env.DEAD_ROLE, {
					ViewChannel: true,
					Connect: false,
					SendMessages: false,
				})
				break
			case 'DEAD':
				createdChannel.permissionOverwrites.create(process.env.ALIVE_ROLE, {
					ViewChannel: false,
					Connect: false,
					SendMessages: false,
				})
				createdChannel.permissionOverwrites.create(process.env.DEAD_ROLE, {
					ViewChannel: true,
					Connect: true,
					SendMessages: true,
				})
				break
			}
		}
	},
	createGameRoles: async (client: Client) => {
		const guild = await client.guilds.fetch(process.env.GUILD_ID)
		const members = await Discord.getMembersByRole(client, 'ALIVE')

		for (const member of members) {
			const role = await guild.roles.create({
				name: member.displayName,
				reason: 'Setting up game...',
			})
			member.roles.add(role)
		}
	},
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
			if ([guild.roles.everyone, process.env.ALIVE_ROLE, process.env.DEAD_ROLE, process.env.MASTER_ROLE, process.env.BOT_ROLE].includes(id)) continue

			role.delete('Resetting...').catch((err) => console.warn(err.message, ` (deleteAllMutableRoles: ${role.name})`))
		}
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
	getMembersByRole: async (client: Client, role: Role): Promise<GuildMember[]> => {
		const guild = await client.guilds.fetch(process.env.GUILD_ID)
		const members = await guild.members.fetch()

		const roleMembers: GuildMember[] = []
		for (const [, member] of members) {
			const roleData = member.roles.cache.find((r) => r.id === (role === 'ALIVE' ? process.env.ALIVE_ROLE : process.env.DEAD_ROLE))

			if (roleData !== undefined) {
				roleMembers.push(member)
			}
		}

		return roleMembers
	},
}

export default Discord