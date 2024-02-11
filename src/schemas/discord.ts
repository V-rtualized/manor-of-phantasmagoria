import { ChannelType } from 'discord.js'
import { Rooms } from './rooms'

export type Category = {
  name: string
}

export type Channel = {
  name: string,
  type: ChannelType.GuildText | ChannelType.GuildVoice,
  category: Category,
  permissions: 'ALIVE' | 'HOSTS' | 'DEAD' | 'LOCATION'
}

export type Role = 'ALIVE' | 'DEAD'

export const Categories: Category[] = [
	{
		name: 'Personal',
	},
	{
		name: 'Communal',
	},
	{
		name: 'Manor',
	},
]

const RoomChannelBuilder = ({ name }: { name: string }): Channel => ({
	name,
	category: Categories[2],
	type: ChannelType.GuildVoice,
	permissions: 'LOCATION',
})

export const Channels: Channel[] = [
	{
		name: 'guest-sending-stone',
		category: Categories[1],
		type: ChannelType.GuildText,
		permissions: 'ALIVE',
	},
	{
		name: 'host-sending-stone',
		category: Categories[1],
		type: ChannelType.GuildText,
		permissions: 'HOSTS',
	},
	{
		name: 'graveyard',
		category: Categories[1],
		type: ChannelType.GuildText,
		permissions: 'DEAD',
	},
	...Rooms.map(RoomChannelBuilder),
]