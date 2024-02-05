import { AttachmentBuilder, ChannelType, Client, Collection, EmbedBuilder, Guild, GuildMember, GuildTextBasedChannel, Snowflake } from 'discord.js'
import { Channels, Role } from '../schemas/discord'

const Discord = {
	getGuild: async (client: Client): Promise<Guild> => client.guilds.fetch(process.env.GUILD_ID),
	getMembers: async (client: Client): Promise<Collection<Snowflake, GuildMember>> => await (await Discord.getGuild(client)).members.fetch(),
	getMembersByRole: async (client: Client, role: Role): Promise<GuildMember[]> => {
		const members = await Discord.getMembers(client)

		const roleMembers: GuildMember[] = []
		for (const [, member] of members) {
			const roleData = member.roles.cache.find((r) => r.id === (role === 'ALIVE' ? process.env.ALIVE_ROLE : process.env.DEAD_ROLE))

			if (roleData !== undefined) {
				roleMembers.push(member)
			}
		}

		return roleMembers
	},
	createGameChannels: async (client: Client) => {
		const guild = await Discord.getGuild(client)
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
		const guild = await Discord.getGuild(client)
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
		const guild = await Discord.getGuild(client)
		const channels = await guild.channels.fetch()

		for (const [, channel] of channels) {
			if (channel?.id === process.env.SYSTEM_CATEGORY || channel?.parent?.id === process.env.SYSTEM_CATEGORY) continue

			channel?.delete('Resetting...').catch((err) => console.warn(err.message, ` (deleteAllMutableChannels: ${channel.name})`))
		}
	},
	deleteAllMutableRoles: async (client: Client) => {
		const guild = await Discord.getGuild(client)
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
	updateGrandfatherClock: async (client: Client, state: string, timestamp: number, playerGroups: { status: string, players: string[] }[]): Promise<void> => {
		const guild = await Discord.getGuild(client)

		const grandfather = await guild.channels.fetch(process.env.GRANDFATHER_CHANNEL)

		if (grandfather === null || !grandfather.isTextBased) {
			throw new Error('Cannot find grandfather channel')
		}

		const image = new AttachmentBuilder('./assets/grandfather.png')
		const embed = new EmbedBuilder().setColor('#2f5753')
			.setTitle('Game Status')
			.addFields({
				name: 'State', value: state,
			}, {
				name: 'State Started', value: `<t:${timestamp}:R>`,
			}, {
				name: '\u200B', value: '\u200B',
			}, ...playerGroups.map(pg => ({ name: pg.status, value: pg.players.join('\n'), inline: true })))
			.setImage('attachment://grandfather.png')
			.setTimestamp()
			.setFooter({ text: 'This message is updated when the state of the game or the state of players change' })

		const grandfatherText = (grandfather as GuildTextBasedChannel)
		const lastMessage = (await grandfatherText.messages.fetch()).at(0)

		if (lastMessage === undefined) {
			await grandfatherText.send({ embeds: [embed], files: [image] })
		}
		else {
			await lastMessage.edit({ embeds: [embed], files: [image] })
		}
	},
	getNamedRole: async (client: Client, id: Snowflake) => {
		const guild = await Discord.getGuild(client)
		const member = await guild.members.fetch(id)
		return (await guild.roles.fetch()).filter((value) => value.name === member.user.username).at(0)
	},
	getVoiceChannelIdFromName: async (client: Client, name: string) => {
		const guild = await Discord.getGuild(client)
		return (await guild.channels.fetch()).filter((value) => value?.type === ChannelType.GuildVoice && value?.name === name).at(0)
	},
	updateVoiceChannelPermissions: async (client: Client, userId: Snowflake, voiceChannelNames: string[]) => {
		const guild = await Discord.getGuild(client)
		const allVoiceChannels = (await guild.channels.fetch()).filter(v => v?.type === ChannelType.GuildVoice)
		const allowedChannels = allVoiceChannels.filter((value) => value ? voiceChannelNames.includes(value.name) : false)
		const role = await Discord.getNamedRole(client, userId)

		if (role === undefined) return

		for (const [, vc] of allVoiceChannels) {
			if (vc === null) continue
			if (allowedChannels.find((value) => value?.id === vc.id)) {
				vc.permissionOverwrites.edit(role, {
					ViewChannel: true,
					Connect: true,
					Speak: true,
					SendMessages: true,
				})
			}
			else {
				vc.permissionOverwrites.delete(role)
			}
		}
	},
}

export default Discord