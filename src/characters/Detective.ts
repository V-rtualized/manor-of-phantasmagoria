import { AttachmentBuilder, ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { ConditionBuilder, DescriptionBuilder, GameCharacterData } from './GameCharacter'

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

	static get image() {
		return new AttachmentBuilder('./assets/detective.png')
	}

	static get description() {
		return DescriptionBuilder(DetectiveData, {
			winCondition: 'ELIM_HOSTS',
			nightAbility: 'Choose someone to *Investigate*',
			abilityConditions: new ConditionBuilder(),
			additionalInformation: 'Will determine the role of their target based on the target\'s *Investigation Result*',
		})
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