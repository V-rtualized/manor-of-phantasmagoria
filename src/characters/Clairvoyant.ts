import { AttachmentBuilder, ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { ConditionBuilder, DescriptionBuilder, GameCharacterData } from './GameCharacter'

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

	static get image() {
		return new AttachmentBuilder('./assets/clairvoyant.png')
	}

	static get description() {
		return DescriptionBuilder(ClairvoyantData, {
			winCondition: 'ELIM_HOSTS',
			nightAbility: 'Choose someone to *Watch*',
			abilityConditions: new ConditionBuilder().canSelfTarget(),
			additionalInformation: 'Will determine every person that *visited* their target that night',
		})
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