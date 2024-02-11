import { AttachmentBuilder, ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { ConditionBuilder, DescriptionBuilder, GameCharacterData } from './GameCharacter'

export const MasterData: GameCharacterData = {
	name: 'Master',
	team: 'HOST',
	position: 'KILLING',
	color: '#8B0000',
}

class Master extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super(MasterData)
	}

	static get image() {
		return new AttachmentBuilder('./assets/master.png')
	}

	static get description() {
		return DescriptionBuilder(MasterData, {
			winCondition: 'ELIM_GUESTS',
			nightAbility: 'Choose someone to kill',
			abilityConditions: new ConditionBuilder().custom('Cannot target *Hosts*'),
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

export default Master