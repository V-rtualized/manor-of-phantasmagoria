import { GuildMember } from 'discord.js'
import { fetchMembers } from './discordCore'

export const getMembersByStatus = async (statusRoleName: string): Promise<GuildMember[]> => {
	const members = await fetchMembers()
	return members.filter(member => member.roles.cache.some(role => role.name === statusRoleName))
}