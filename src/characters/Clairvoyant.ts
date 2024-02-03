import { ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { GameCharacterData } from './GameCharacter'

export const ClairvoyantData: GameCharacterData = {
	name: 'Clairvoyant',
	team: 'GUEST',
	position: 'SUPPORT',
	color: '#4169E1',
}

class Clairvoyant extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super(ClairvoyantData)
	}

	static get description() {
		return `**Team:** *Guests*

**Night Ability:** Choose someone to *Watch*

**Investigation Result:** *Support* Role

**Win Condition:** All *Hosts* are eliminated

**Ability Conditions:** Visits their target

**Additional Information:** Will determine every person that *visited* their target that night`
	}

	selectAction = (interaction: ChatInputCommandInteraction): boolean => {
		interaction.reply({ content: 'Hello' })
		return true
	}

	clean = (): void => {
		this._target = undefined
	}

	onWinCheck = (): boolean => false
}

export default Clairvoyant