import { AttachmentBuilder, ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { ConditionBuilder, DescriptionBuilder, GameCharacterData } from './GameCharacter'

export const VigilanteData: GameCharacterData = {
	name: 'Vigilante',
	team: 'GUEST',
	position: 'KILLING',
	color: '#000000',
}

class Vigilante extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super(VigilanteData)
	}

	static get image() {
		return new AttachmentBuilder('./assets/vigilante.png')
	}

	static get description() {
		return DescriptionBuilder(VigilanteData, {
			winCondition: 'ELIM_HOSTS',
			nightAbility: 'Choose someone to kill',
			abilityConditions: new ConditionBuilder(),
			additionalInformation: 'If they kill a *Guest*, the Vigilante dies too',
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

export default Vigilante