import { ChatInputCommandInteraction, ColorResolvable } from 'discord.js'
import { Team, Position } from '../schemas/database'

export type Status = 'ALIVE' | 'DEAD'

export type Investigated = 'INVESTIGATIVE' | 'SUPPORT/PROTECTIVE' | 'KILLING/EVIL'

abstract class GameCharacter {
	private _name: string
	private _team: Team
	private _position: Position
	private _status: Status = 'ALIVE'
	private _color: ColorResolvable

	constructor(name: string, team: Team, position: Position, color: ColorResolvable) {
		this._name = name
		this._team = team
		this._position = position
		this._color = color
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

  abstract get description(): string

  canBeSelected = (): boolean => true

  abstract selectAction(interaction: ChatInputCommandInteraction): boolean

  abstract clean(): void

  kill = () => {
  	this._status = 'DEAD'
  }

  abstract onWinCheck(): boolean
}

export default GameCharacter