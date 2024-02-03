import { ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { GameCharacterData } from './GameCharacter'

export const StewardData: GameCharacterData = {
	name: 'Steward',
	team: 'HOST',
	position: 'KILLING',
	color: '#006400',
}

class Steward extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super(StewardData)
	}

	static get description() {
		return `**Team:** *Hosts*

**Night Ability:** Choose someone to kill

**Investigation Result:** *Killing* Role

**Win Condition:** All *Guests* are eliminated

**Ability Conditions:** Visits their target, cannot target *Hosts*

**Additional Information:** This role is not given at the start of the game`
	}

	canBeSelected = (): boolean => false

	selectAction(interaction: ChatInputCommandInteraction): boolean {
		interaction.reply({ content: 'Hello' })
		return true
	}

	clean(): void {
		this._target = undefined
	}

	onWinCheck = (): boolean => false
}

export default Steward