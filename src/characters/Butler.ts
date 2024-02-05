import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, Snowflake } from 'discord.js'
import GameCharacter, { GameCharacterData, Investigated } from './GameCharacter'

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
		return new EmbedBuilder()
			.setColor(ButlerData.color)
			.setTitle(ButlerData.name)
			.addFields({
				name: 'Team', value: ButlerData.team, inline: true,
			}, {
				name: 'Investigation Result', value: `${ButlerData.position} Role`, inline: true,
			}, {
				name: 'Win Condition', value: 'All *Guests* are eliminated', inline: true,
			}, {
				name: '\u200B', value: '\u200B',
			}, {
				name: 'Night Ability', value: 'Change the perceived role and visitors of someone else when they are observered by other characters',
			}, {
				name: 'Ability Conditions', value: 'Visits their target, cannot target *Hosts*',
			}, {
				name: 'Additional Information', value: 'Selects target, role, and visitors. If target is *Investigated* they will be shown as chosen role. If target is *Watched* they will be shown as visited by chosen visitor, as well as the *Butler*. Becomes the *Steward* if the *Master* dies',
			})
			.setThumbnail('attachment://butler.png')
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