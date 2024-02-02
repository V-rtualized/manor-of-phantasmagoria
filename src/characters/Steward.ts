import { ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter from './GameCharacter'

class Steward extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super('Steward', 'HOST', 'KILLING', '#006400')
	}

	get description() {
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