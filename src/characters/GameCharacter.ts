/* eslint-disable no-mixed-spaces-and-tabs */
// Eslint disable because the kill function is broken

/* eslint-disable no-unused-vars */
// Eslint disable because abstract class

import { AttachmentBuilder, ChatInputCommandInteraction, ColorResolvable, EmbedBuilder } from 'discord.js'

export type Team = 'GUEST' | 'HOST' | 'NEUTRAL'

export type Guest_Position = 'INVESTIGATIVE' | 'PROTECTIVE' | 'SUPPORT' | 'KILLING' | 'OTHER'
export type Host_Position = 'SUPPORT' | 'KILLING' | 'OTHER'
export type Neutral_Position = 'EVIL' | 'BENIGN'
export type Position = Guest_Position | Host_Position | Neutral_Position

export type Status = 'ALIVE' | 'DEAD'

export type Investigated = 'INVESTIGATIVE' | 'SUPPORT/PROTECTIVE' | 'KILLING/EVIL'

export type GameCharacterData = {
	name: string
	team: Team
	position: Position
	color: ColorResolvable
}

type WinCondition = 'ELIM_GUESTS' | 'ELIM_HOSTS' | 'SURVIVE'

export class ConditionBuilder {
	_visits: boolean
	_selfTarget: boolean
	_custom: string | null

	constructor() {
		this._visits = true
		this._selfTarget = false
		this._custom = null
	}

	canSelfTarget = () => {
		this._selfTarget = true
		return this
	}

	custom = (str: string) => {
		this._custom = str
		return this
	}

	toString = () => {
		const descriptions = []
		if (this._custom) {
			descriptions.push(this._custom)
		}
		if (this._visits) {
			descriptions.push('Visits their target')
		}
		if (!this._selfTarget) {
			descriptions.push('Cannot target themselves')
		}
		return descriptions.map((str, i) => i > 0 && str.toLowerCase()).join(', ')
	}
}

export type DescriptionFields = {
	winCondition: WinCondition,
	nightAbility: string,
	abilityConditions: ConditionBuilder,
	additionalInformation?: string
}

const winConditionToDescription = (winCondition: WinCondition) => {
	switch (winCondition) {
	case 'ELIM_GUESTS':
		return 'All *Guests* are eliminated'
	case 'ELIM_HOSTS':
		return 'All *Hosts* are eliminated'
	case 'SURVIVE':
		return 'Survives until someone wins'
	}
}

export const DescriptionBuilder = (data: GameCharacterData, fields: DescriptionFields) => {
	let embed = new EmbedBuilder()
		.setColor(data.color)
		.setTitle(data.name)
		.addFields({
			name: 'Team', value: data.team, inline: true,
		}, {
			name: 'Investigation Result', value: `${data.position} Role`, inline: true,
		}, {
			name: 'Win Condition', value: winConditionToDescription(fields.winCondition), inline: true,
		}, {
			name: '\u200B', value: '\u200B',
		}, {
			name: 'Night Ability', value: fields.nightAbility,
		}, {
			name: 'Ability Conditions', value: fields.abilityConditions.toString(),
		})
		.setThumbnail(`attachment://${data.name.toLowerCase()}.png`)

	if (fields.additionalInformation) {
		embed = embed.addFields({
			name: 'Additional Information', value: fields.additionalInformation,
		})
	}

	return embed
}

export const DESCRIPTIONS = {
	WIN_CONDITION: {
		GENERIC_HOSTS: {
			name: 'Win Condition', value: 'All *Guests* are eliminated', inline: true,
		},
		GEMERIC_GUESTS: {
			name: 'Win Condition', value: 'All *Hosts* are eliminated', inline: true,
		},
	},
}

abstract class GameCharacter {
	private _name: string
	private _team: Team
	private _position: Position
	private _status: Status = 'ALIVE'
	private _color: ColorResolvable

	constructor(data: GameCharacterData) {
		this._name = data.name
		this._team = data.team
		this._position = data.position
		this._color = data.color
	}

	get character(): string {
		return this._name
	}

	get team(): Team {
		return this._team
	}

	get position(): Position {
		return this._position
	}

	get status(): Status {
		return this._status
	}

	get color(): ColorResolvable {
		return this._color
	}

	static get image(): AttachmentBuilder {
		throw new Error('Not Implemented (GameCharacter.image)')
	}

	static get description(): EmbedBuilder {
		throw new Error('Not Implemented (GameCharacter.description)')
	}

	canBeSelected = (): boolean => true

  abstract selectAction(interaction: ChatInputCommandInteraction): boolean

  abstract clean(): void

  kill = () => {
  	this._status = 'DEAD'
  }

  abstract onWinCheck(): boolean
}

export default GameCharacter