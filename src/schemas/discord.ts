import { ChannelType } from 'discord.js'

export type Category = {
  name: string
}

export type Channel = {
  name: string,
  type: ChannelType,
  category: Category,
  canUse: Role[]
}

export type Role = {
  name: string,
  color: string,
  hidden?: boolean
}

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

export const Roles: Role[] = [
	{
		name: 'ALIVE',
		color: '#36b357',
	},
	{
		name: 'DEAD',
		color: '#a30e0e',
	},
  {
    name: 'HOST',
    color: '#000000',
    hidden: true
  }
]

export const Channels: Channel[] = [
  {
    name: 'guest-sending-stone',
    category: Categories[1],
    type: ChannelType.GuildText,
    canUse: [Roles[0]]
  },
  {
    name: 'host-sending-stone',
    category: Categories[1],
    type: ChannelType.GuildText,
    canUse: []
  },
	{
		name: 'Front Hall',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		name: 'East Hallway',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		name: 'West Hallway',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Room 110',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Room 111',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Room 112',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Room 113',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Room 120',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Room 121',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Room 122',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Room 123',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Grand Stairs',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Upper Level',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Master\'s Quarters',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Servant\'s Passageways',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Library',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Observatory',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Kitchen',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
	{
		'name': 'Graveyard',
		category: Categories[2],
		type: ChannelType.GuildVoice,
		canUse: [],
	},
]