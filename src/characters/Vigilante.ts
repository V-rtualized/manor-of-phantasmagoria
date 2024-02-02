import { ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter from './GameCharacter'

class Vigilante extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super('Vigilante', 'GUEST', 'KILLING', '#000000')
	}

	get description() {
		return `**Team:** *Guests*

		**Night Ability:** Choose someone to kill
		
		**Investigation Result:** *Killing* Role
		
		**Win Condition:** All *Hosts* are eliminated
		
		**Ability Conditions:** Visits their target, cannot target themselves
		
		**Additional Information:** If they kill a *Guest*, the Vigilante dies too`
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

export default Vigilante