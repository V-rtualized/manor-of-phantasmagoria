import { ChannelType } from 'discord.js'

export type Category = {
  name: string
}

export type Channel = {
  name: string,
  type: ChannelType,
  category: Category,
  canSee: 'EVERYONE' | 'HOSTS' | 'DEAD' | 'LOCATION' | 'PERSONAL'
	canUse: 'ALIVE' | 'HOSTS' | 'DEAD' | 'LOCATION' | 'PERSONAL'
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
		name: 'personal',
		category: Categories[0],
		type: ChannelType.GuildText,
		canSee: 'PERSONAL',
		canUse: 'PERSONAL',
	},
	{
		name: 'guest-sending-stone',
		category: Categories[1],
		type: ChannelType.GuildText,
		canSee: 'EVERYONE',
		canUse: 'ALIVE',
	},
	{
		name: 'host-sending-stone',
		category: Categories[1],
		type: ChannelType.GuildText,
		canSee: 'HOSTS',
		canUse: 'HOSTS',
	},
	{
		name: 'graveyard',
		category: Categories[1],
		type: ChannelType.GuildText,
		canSee: 'DEAD',
		canUse: 'DEAD',
	},
	{
		name: 'Front Hall',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		name: 'East Hallway',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		name: 'West Hallway',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Room 110',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Room 111',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Room 112',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Room 113',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Room 120',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Room 121',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Room 122',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Room 123',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Grand Stairs',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Upper Level',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Master\'s Quarters',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Servant\'s Passageways',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Library',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Observatory',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Kitchen',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
	{
		'name': 'Graveyard',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canSee: 'LOCATION',
		canUse: 'LOCATION',
	},
]