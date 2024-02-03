import { ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { GameCharacterData } from './GameCharacter'

export const DetectiveData: GameCharacterData = {
	name: 'Detective',
	team: 'GUEST',
	position: 'INVESTIGATIVE',
	color: '#BDB76B',
}

class Detective extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super(DetectiveData)
	}

	static get description() {
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