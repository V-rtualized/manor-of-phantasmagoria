import { ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter from './GameCharacter'

class Master extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super('Master', 'HOST', 'KILLING', '#8B0000')
	}

	get description() {
		return `**Team:** *Hosts*

**Night Ability:** Choose someone to kill

**Investigation Result:** *Killing* Role

**Win Condition:** All *Guests* are eliminated

**Ability Conditions:** Visits their target, cannot target *Hosts*`
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

export default Master