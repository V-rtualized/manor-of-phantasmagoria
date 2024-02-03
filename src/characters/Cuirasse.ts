import { ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { GameCharacterData } from './GameCharacter'

export const CuirasseData: GameCharacterData = {
	name: 'Cuirasse',
	team: 'GUEST',
	position: 'PROTECTIVE',
	color: '#B8860B',
}

class Cuirasse extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super(CuirasseData)
	}

	static get description() {
		return `**Team:** *Guests*

**Night Ability:** Choose someone to protect with their life, or protect themselves once

**Investigation Result:** *SUPPORT* Role

**Win Condition:** All *Hosts* are eliminated

**Ability Conditions:** Visits their target, can target themselves once per game

**Additional Information:** If they protect someone other than themselves that gets attacked, the *Cuirasse* and the attacker die instead`
	}

	selectAction(interaction: ChatInputCommandInteraction): boolean {
		interaction.reply({ content: 'Hello' })
		return true
	}

	clean(): void {
		this._target = undefined
	}

	onWinCheck = (): boolean => false
}

export default Cuirasse