import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, Snowflake } from 'discord.js'
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

	static get image() {
		return new AttachmentBuilder('./assets/clairvoyant.png')
	}

	static get description() {
		return new EmbedBuilder()
			.setColor(ClairvoyantData.color)
			.setTitle(ClairvoyantData.name)
			.addFields({
				name: 'Team', value: ClairvoyantData.team, inline: true,
			}, {
				name: 'Investigation Result', value: `${ClairvoyantData.position} Role`, inline: true,
			}, {
				name: 'Win Condition', value: 'All *Hosts* are eliminated', inline: true,
			}, {
				name: '\u200B', value: '\u200B',
			}, {
				name: 'Night Ability', value: 'Choose someone to *Watch*',
			}, {
				name: 'Ability Conditions', value: 'Visits their target',
			}, {
				name: 'Additional Information', value: 'Will determine every person that *visited* their target that night',
			})
			.setThumbnail('attachment://clairvoyant.png')
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