const { Collection, ChannelType } = jest.requireActual('discord.js')

const mockTextChannel = { id: '123', name: 'text', type: ChannelType.GuildText }
const mockVoiceChannel = { id: '456', name: 'VC', type: ChannelType.GuildVoice }

const mockRole = { id: '123', name: 'ALIVE' }

const mockMember = { id: '123', displayName: 'TestMember' }

const mockGuild = {
	id: '123',
	name: 'TestGuild',
	members: {
		fetch: jest.fn().mockImplementation((id) => {
			if (id === undefined) {
				const res = new Collection()
				res.set(mockMember.id, mockMember)
				return Promise.resolve(res)
			}
			if (id === mockMember.id) {
				return Promise.resolve(mockMember)
			}
			return Promise.resolve(undefined)
		}),
	},
	roles: {
		fetch: jest.fn().mockImplementation((id) => {
			if (id === undefined) {
				const res = new Collection()
				res.set(mockRole.id, mockRole)
				return Promise.resolve(res)
			}
			if (id === mockRole.id) {
				return Promise.resolve(mockRole)
			}
			return Promise.resolve(undefined)
		}),
	},
	channels: {
		fetch: jest.fn().mockImplementation(() => {
			const res = new Collection()
			res.set(mockTextChannel.id, mockTextChannel)
			res.set(mockVoiceChannel.id, mockVoiceChannel)
			return Promise.resolve(res)
		}),
	},
}

const mockClient = {
	login: jest.fn(),
	guilds: {
		fetch: jest.fn().mockResolvedValue(mockGuild),
	},
	commands: new Collection(),
	cooldowns: new Collection(),
}


module.exports = {
	...jest.requireActual('discord.js'),
	Client: jest.fn().mockImplementation(() => mockClient),
	mockClient,
	mockGuild,
	mockMember,
	mockRole,
	mockVoiceChannel,
	mockTextChannel,
}
