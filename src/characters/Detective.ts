import { ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter from './GameCharacter'

class Detective extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super('Detective', 'GUEST', 'INVESTIGATIVE', '#BDB76B')
	}

	get description() {
		return `**Team:** *Guests*

**Night Ability:** Choose someone to *Investigate*

**Investigation Result:** *Investigative* Role

**Win Condition:** All *Hosts* are eliminated

**Ability Conditions:** Visits their target, cannot target themselves

**Additional Information:** Will determine the role of their target based on the target's *Investigation Result*`
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

export default Detective