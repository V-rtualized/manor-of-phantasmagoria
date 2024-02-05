import { Client, Events, VoiceState } from 'discord.js'
import Discord from '../services/Discord'
import { Rooms } from '../schemas/rooms'
import { BotEvent } from '../types'

const event: BotEvent = {
	name: Events.VoiceStateUpdate,
	execute: async (client: Client, oldState: VoiceState, newState: VoiceState) => {
		const memberId = newState?.member?.id

		if (memberId === undefined) throw new Error('Member not defined (voiceStateUpdate)')

		if (newState.channel === null) {
			if (oldState.channel === null) throw new Error('oldState and newState both not defined (voiceStateUpdate)')
			Discord.updateVoiceChannelPermissions(client, memberId, [oldState.channel.name])
			return
		}

		const newChannelName = newState.channel.name
		const room = Rooms.find((r) => r.name === newChannelName)

		if (room === undefined) throw new Error('Room not found in schema (voiceStateUpdate)')

		const allowedChannels = [newChannelName, ...room.to]
		Discord.updateVoiceChannelPermissions(client, memberId, allowedChannels)
	},
}

export default event