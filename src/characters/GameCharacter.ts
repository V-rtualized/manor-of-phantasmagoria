/* eslint-disable no-mixed-spaces-and-tabs */
// Eslint disable because the kill function is broken

/* eslint-disable no-unused-vars */
// Eslint disable because abstract class

import { ChatInputCommandInteraction, ColorResolvable } from 'discord.js'
import { Team, Position } from '../schemas/database'

export type Status = 'ALIVE' | 'DEAD'

export type Investigated = 'INVESTIGATIVE' | 'SUPPORT/PROTECTIVE' | 'KILLING/EVIL'

export type GameCharacterData = {
	name: string
	team: Team
	position: Position
	color: ColorResolvable
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

	static get description(): string {
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