import { AttachmentBuilder, ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { ConditionBuilder, DescriptionBuilder, GameCharacterData } from './GameCharacter'

export const CuirasseData: GameCharacterData = {
	name: 'Cuirasse',
	team: 'GUEST',
	position: 'PROTECTIVE',
	color: '#B8860B',
}

class Cuirasse extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super(CuirasseData)
	}

	static get image() {
		return new AttachmentBuilder('./assets/cuirasse.png')
	}

	static get description() {
		return DescriptionBuilder(CuirasseData, {
			winCondition: 'ELIM_HOSTS',
			nightAbility: 'Choose someone to protect with their life, or protect themselves once',
			abilityConditions: new ConditionBuilder().custom('Can target themselves once per game'),
			additionalInformation: 'If they protect someone other than themselves that gets attacked, the *Cuirasse* and the attacker die instead',
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

export default Cuirasse