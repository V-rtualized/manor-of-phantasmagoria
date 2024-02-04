import { ChannelType } from 'discord.js'

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
	{
		name: 'Front Hall',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'East Hallway',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'West Hallway',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Room 110',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Room 111',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Room 112',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Room 113',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Room 120',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Room 121',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Room 122',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Room 123',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Grand Stairs',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Upper Level',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Master\'s Quarters',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Servant\'s Passageways',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Library',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Observatory',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Kitchen',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
	{
		name: 'Graveyard',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		permissions: 'LOCATION',
	},
]