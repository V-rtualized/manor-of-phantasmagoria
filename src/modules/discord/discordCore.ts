import { Client, Collection, GatewayIntentBits, Guild, GuildMember, NonThreadGuildBasedChannel, Role, Snowflake } from 'discord.js'
import { SlashCommand } from '../../types'
import { join } from 'path'
import { readdirSync } from 'fs'
import { collectionToValuesArray } from '../../utils/collectionUtils'
import { isNotNull } from '../../utils/typeUtils'
import { color } from '../../utils/colorUtils'

const { Guilds, MessageContent, GuildMessages, GuildMembers, GuildVoiceStates } = GatewayIntentBits
/**
 * This is only exported for testing, do not import
 * @access private
 */
export const client = new Client({ intents:[Guilds, MessageContent, GuildMessages, GuildMembers, GuildVoiceStates] })

client.commands = new Collection<string, SlashCommand>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, '../../handlers')
readdirSync(handlersDir).forEach(handler => {
	if (!handler.endsWith('.js')) return
	require(`${handlersDir}/${handler}`)(client)
})

export const initClient = () => client.login(process.env.DISCORD_TOKEN)

export const fetchGuild = async (): Promise<Guild> => {
	const guild = await client.guilds.fetch(process.env.GUILD_ID)
	if (!guild) {
		console.log(color('error', 'getGuild failed'))
		throw new Error('getGuild failed')
	}
	return guild
}

export const getMember = async (id: Snowflake): Promise<GuildMember | undefined> => {
	const guild = await fetchGuild()
	const member = await guild.members.fetch(id)
	return member
}

export const fetchMembers = async (): Promise<GuildMember[]> => {
	const guild = await fetchGuild()
	const members = await guild.members.fetch()
	return collectionToValuesArray(members)
}

export const getRole = async (id: Snowflake): Promise<Role | undefined> => {
	const guild = await fetchGuild()
	const role = await guild.roles.fetch(id)
	return role ?? undefined
}

export const fetchRoles = async (): Promise<Role[]> => {
	const guild = await fetchGuild()
	const roles = await guild.roles.fetch()
	return collectionToValuesArray(roles)
}

export const fetchChannels = async (): Promise<NonThreadGuildBasedChannel[]> => {
	const guild = await fetchGuild()
	const channels = await guild.channels.fetch()
	return collectionToValuesArray<NonThreadGuildBasedChannel>(channels.filter(isNotNull))
}

export const findChannelByName = async (name: string): Promise<NonThreadGuildBasedChannel | undefined> => {
	const channels = await fetchChannels()
	return channels.filter((value) => value?.name === name).at(0)
}