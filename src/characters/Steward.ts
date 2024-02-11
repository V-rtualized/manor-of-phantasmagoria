import { AttachmentBuilder, ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { ConditionBuilder, DescriptionBuilder, GameCharacterData } from './GameCharacter'

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

	static get image() {
		return new AttachmentBuilder('./assets/steward.png')
	}

	static get description() {
		return DescriptionBuilder(StewardData, {
			winCondition: 'ELIM_GUESTS',
			nightAbility: 'Choose someone to kill',
			abilityConditions: new ConditionBuilder().custom('Cannot target *Hosts*'),
			additionalInformation: 'This role is not given at the start of the game',
		})
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