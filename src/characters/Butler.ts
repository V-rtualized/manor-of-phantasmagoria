import { AttachmentBuilder, ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { ConditionBuilder, DescriptionBuilder, GameCharacterData, Investigated } from './GameCharacter'

export const ButlerData: GameCharacterData = {
	name: 'Butler',
	team: 'HOST',
	position: 'SUPPORT',
	color: '#191970',
}

class Butler extends GameCharacter {

	private _target: Snowflake | undefined
	private _selectedRole: Investigated | undefined
	private _selectedVisitors: Snowflake[] | undefined

	constructor() {
		super(ButlerData)
	}

	static get image() {
		return new AttachmentBuilder('./assets/butler.png')
	}

	static get description() {
		return DescriptionBuilder(ButlerData, {
			winCondition: 'ELIM_GUESTS',
			nightAbility: 'Change the perceived role and visitors of someone else when they are observered by other characters',
			abilityConditions: new ConditionBuilder().custom('Cannot target *Hosts*'),
			additionalInformation: 'Selects target, role, and visitors. If target is *Investigated* they will be shown as chosen role. If target is *Watched* they will be shown as visited by chosen visitor, as well as the *Butler*. Becomes the *Steward* if the *Master* dies',
		})
	}

	selectAction(interaction: ChatInputCommandInteraction): boolean {
		interaction.reply({ content: 'Hello' })
		return true
	}

	clean(): void {
		this._target = undefined
		this._selectedRole = undefined
		this._selectedVisitors = undefined
	}

	onWinCheck = (): boolean => false
}

export default Butler