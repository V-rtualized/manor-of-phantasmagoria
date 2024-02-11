import { AttachmentBuilder, ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { ConditionBuilder, DescriptionBuilder, GameCharacterData } from './GameCharacter'

export const CourtesanData: GameCharacterData = {
	name: 'Courtesan',
	team: 'NEUTRAL',
	position: 'EVIL',
	color: '#8B008B',
}

class Courtesan extends GameCharacter {

	private _target: Snowflake | undefined
	private _victim: Snowflake | undefined

	constructor() {
		super(CourtesanData)
	}

	static get image() {
		return new AttachmentBuilder('./assets/courtesan.png')
	}

	static get description() {
		return DescriptionBuilder(CourtesanData, {
			winCondition: 'SURVIVE',
			nightAbility: 'Choose someone to seduce and control, then choose a victim',
			abilityConditions: new ConditionBuilder(),
			additionalInformation: 'The chosen target will use their night ability on the chosen victim, the chosen victim can be the Courtensan, the target will not be told they were seduced',
		})
	}

	selectAction(interaction: ChatInputCommandInteraction): boolean {
		interaction.reply({ content: 'Hello' })
		return true
	}

	clean(): void {
		this._target = undefined
		this._victim = undefined
	}

	onWinCheck = (): boolean => false
}

export default Courtesan