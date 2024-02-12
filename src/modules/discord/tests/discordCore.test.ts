jest.mock('discord.js')

import _ from 'lodash'
import { fetchChannels, fetchGuild, fetchMembers, fetchRoles, findChannelByName, getMember, getRole } from '../discordCore'
// @ts-ignore
import { mockClient, mockGuild, mockMember, mockRole, mockVoiceChannel, mockTextChannel } from 'discord.js'

describe('discordCore - fetchGuild', () => {
	it('fetches the guild successfully', async () => {
		const guild = await fetchGuild()
		expect(guild.id).toEqual(mockGuild.id)
		expect(mockClient.guilds.fetch).toHaveBeenCalledWith(process.env.GUILD_ID)
	})

	it('throws an error if the guild is not found', async () => {
		mockClient.guilds.fetch.mockResolvedValue(null)
		await expect(fetchGuild()).rejects.toThrow('getGuild failed')
		// Reset to original
		mockClient.guilds.fetch.mockResolvedValue(mockGuild)
	})
})

describe('discordCore - getMember', () => {
	it('fetches the member successfully', async () => {
		const member = await getMember(mockMember.id)
		expect(member?.id).toEqual(mockMember.id)
		expect(mockGuild.members.fetch).toHaveBeenCalledWith(mockMember.id)
	})

	it('returns undefined if the member is not found', async () => {
		expect(await getMember('321')).toBeUndefined()
	})
})

describe('discordCore - fetchMembers', () => {
	it('fetches the member successfully', async () => {
		const members = await fetchMembers()
		expect(members).toEqual([mockMember])
		expect(mockGuild.members.fetch).toHaveBeenCalled()
	})
})

describe('discordCore - fetchMembers', () => {
	it('fetches the members successfully', async () => {
		const members = await fetchMembers()
		expect(members).toEqual([mockMember])
		expect(mockGuild.members.fetch).toHaveBeenCalled()
	})
})

describe('discordCore - getRoles', () => {
	it('fetches the role successfully', async () => {
		const role = await getRole(mockRole.id)
		expect(role?.id).toEqual(mockRole.id)
		expect(mockGuild.roles.fetch).toHaveBeenCalledWith(mockRole.id)
	})

	it('returns undefined if the role is not found', async () => {
		expect(await getRole('321')).toBeUndefined()
	})
})

describe('discordCore - fetchRoles', () => {
	it('fetches the roles successfully', async () => {
		const roles = await fetchRoles()
		expect(roles).toEqual([mockRole])
		expect(mockGuild.roles.fetch).toHaveBeenCalled()
	})
})

describe('discordCore - fetchChannels', () => {
	it('fetches the channels successfully', async () => {
		const channels = await fetchChannels()
		const sortedChannels = _.sortBy(channels, 'name')
		expect(sortedChannels).toEqual(_.sortBy([mockVoiceChannel, mockTextChannel], 'name'))
		expect(mockGuild.channels.fetch).toHaveBeenCalled()
	})
})

describe('discordCore - findChannelByName', () => {
	it('finds voice channels successfully', async () => {
		const channel = await findChannelByName(mockVoiceChannel.name)
		expect(channel).toEqual(mockVoiceChannel)
	})

	it('finds text channels successfully', async () => {
		const channel = await findChannelByName(mockTextChannel.name)
		expect(channel).toEqual(mockTextChannel)
	})
})