import { Snowflake } from 'discord.js'
import { GameCharacterData } from '../characters/GameCharacter'

export type Player = {
  id: Snowflake,
  room: string,
  location: string,
  inventory: number,
  character: GameCharacterData
}

export type Team = 'GUEST' | 'HOST' | 'NEUTRAL'
export type Guest_Position = 'INVESTIGATIVE' | 'PROTECTIVE' | 'SUPPORT' | 'KILLING' | 'OTHER'
export type Host_Position = 'SUPPORT' | 'KILLING' | 'OTHER'
export type Neutral_Position = 'EVIL' | 'BENIGN'
export type Position = Guest_Position | Host_Position | Neutral_Position

export const SelectType = {
	SINGLE: 'SINGLE',
	MULTIPLE: 'MULTIPLE',
}

export const Target = {
	EVERYONE: 'EVERYONE',
	OTHERS: 'OTHERS',
	ENEMIES: 'ENEMIES',
	CUSTOM: (...options: string[]) => `CUSTOM:${options.join(',')}`,
}

export const Positions = {
	GUEST: {
		INVESTIGATIVE: 'G_INVESTIGATIVE',
		PROTECTIVE: 'G_PROTECTIVE',
		SUPPORT: 'G_SUPPORT',
		KILLING: 'G_KILLING',
		OTHER: 'G_OTHER',
	},
	NEUTRAL: {
		EVIL: 'N_EVIL',
		BENIGN: 'N_BENIGN',
	},
	HOST: {
		KILLING: 'H_KILLING',
		DECEPTION: 'H_DECEPTION',
		OTHER: 'H_OTHER',
	},
}

export const InvestigatedOption = {
	INVESTIGATIVE: 'INVESTIGATIVE',
	SUPPORT: 'SUPPORT/PROTECTIVE',
	PROTECTIVE: 'SUPPORT/PROTECTIVE',
	KILLING: 'KILLING',
	DECEPTION: 'DECEPTION/EVIL',
	EVIL: 'DECEPTION/EVIL',
}

export const Characters = [
	{
		name: 'Clairvoyant',
		position: Positions.GUEST.SUPPORT,
		description: `The Clairvoyant possesses the ability to set magic wards on individual's rooms at night.
  These wards tell the Clairvoyant of everyone who visits the occupant that night.
  The Clairvoyant can target themselves. The Clairvoyant will visit their target at night.
  The Clairvoyant is on the side of the guests and wins if all the hosts are eliminated.`,
		action: [
			{
				description: 'Select a target to ward:',
				targets: Target.EVERYONE,
				select: SelectType.SINGLE,
			},
		],
	},
	{
		name: 'Detective',
		position: Positions.GUEST.INVESTIGATIVE,
		description: `The Detective possesses the ability to investigate an individual's room at night.
  The Detective will deduct the type of role the individual has.
  These options are INVESTIGATIVE, SUPPORT/PROTECTIVE, KILLING, DECEPTION/EVIL.
  The Detective cannot target themselves. The Dectective will visit their target at night.
  The Detective is on the side of the guests and wins if all the hosts are eliminated.`,
		action: [
			{
				description: 'Select a target to investigate:',
				targets: Target.OTHERS,
				select: SelectType.SINGLE,
			},
		],
	},
	{
		name: 'Vigilante',
		position: Positions.GUEST.KILLING,
		description: `The Vigilante possesses tha ability to kill an individual at night.
  If the Vigilante kills a guest they will also kill themselves on the same night.
  The Vigilante cannot target themselves. The Vigilante will visit their target at night.
  The Vigilante is on the side of the guests and wins if all the hosts are eliminated.`,
		action: [
			{
				description: 'Select a target to kill:',
				targets: Target.OTHERS,
				select: SelectType.SINGLE,
			},
		],
	},
	{
		name: 'Cuirasse',
		team: Positions.GUEST.PROTECTIVE,
		description: `The Cuirasse possesses the ability to protect an individual at night.
  If the individual that the Cuirasse protects is attacked, they will survive.
  If the Cuirasse successfully protects an individual, they will kill the attacker and also die.
  The Cuirasse can target themselves once per game. The Cuirasse will not die if they are targetting themselves.
  The Cuirasse will visit their target at night.
  The Cuirasse is on the side of the guests and wins if all the hosts are eliminated.`,
		action: [
			{
				description: 'Select a target to protect:',
				targets: Target.EVERYONE,
				select: SelectType.SINGLE,
			},
		],
	},
	{
		name: 'Footman',
		team: Positions.HOST.KILLING,
	},
	{
		name: 'Butler',
		team: Positions.HOST.DECEPTION,
		description: `The Butler possesses the ability to change information gathered by other individuals.
  When the Butler targets an individual at night, they will select a percieved role and visitors.
  If the Butler's target is INVESTIGATED, their role will be shown as the selected role.
  If the Butler's target is SPIED ON, their visitors will be shown as the selected visitors.
  The Butler can target themselves. The Butler will visit their target at night.
  If INVESTIGATED, the Butler will be revealed as a DECEPTION/EVIL role.
  The Butler is on the side of the hosts and wins if all the guests are eliminated.`,
		action: [
			{
				description: 'Select a target to fake information for:',
				target: Target.EVERYONE,
				select: SelectType.SINGLE,
			},
			{
				description: 'Select a role to fake:',
				target: Target.CUSTOM(...Object.values(InvestigatedOption)),
				select: SelectType.SINGLE,
			},
			{
				description: 'Select a visitors to fake:',
				target: Target.EVERYONE,
				select: SelectType.MULTIPLE,
			},
		],
	},
	{
		name: 'Chef',
		team: Positions.HOST.KILLING,
		description: `The Chef possesses the ability to kill an individual at night.
  The Chef cannot target hosts. The Chef will visit their target at night.
  If INVESTIGATED, the Chef will be revealed as a KILLING role.
  The Chef is on the side of the hosts and wins if all the guests are eliminated.`,
		action: [
			{
				description: 'Select a target to kill:',
				targets: Target.ENEMIES,
				select: SelectType.SINGLE,
			},
		],
	},
	{
		name: 'Courtesan',
		team: Positions.NEUTRAL.EVIL,
		description: `The Courtesan possesses the ability to seduce and control the target of an individual at night.
  The Courtesan chooses a target and a victim every day, the target will use their ability on the victim.
  The Courtesan can make the target use their ability on themselves themselves, even if they are not capable normally.
  The victim will not be told they were seduced. The Courtesan will visit the victim's room at night.
  The Courtesan cannot target themselves, but can choose themselves as the victim.
  If INVESTIGATED, the Courtesan will be revealed as a DECEPTION/EVIL role.
  The Courtesan is not on a side, they win if they survive until the end.`,
		action: [
			{
				description: 'Select a target to control:',
				targets: Target.OTHERS,
				select: SelectType.SINGLE,
			},
			{
				description: 'Select a victim of your target:',
				targets: Target.EVERYONE,
				select: SelectType.SINGLE,
			},
		],
	},
]