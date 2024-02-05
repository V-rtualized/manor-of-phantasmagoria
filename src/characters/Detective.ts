import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, Snowflake } from 'discord.js'
import GameCharacter, { GameCharacterData } from './GameCharacter'

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
		return new EmbedBuilder()
			.setColor(DetectiveData.color)
			.setTitle(DetectiveData.name)
			.addFields({
				name: 'Team', value: DetectiveData.team, inline: true,
			}, {
				name: 'Investigation Result', value: `${DetectiveData.position} Role`, inline: true,
			}, {
				name: 'Win Condition', value: 'All *Hosts* are eliminated', inline: true,
			}, {
				name: '\u200B', value: '\u200B',
			}, {
				name: 'Night Ability', value: 'Choose someone to *Investigate*',
			}, {
				name: 'Ability Conditions', value: 'Visits their target, cannot target themselves',
			}, {
				name: 'Additional Information', value: 'Will determine the role of their target based on the target\'s *Investigation Result*',
			})
			.setThumbnail('attachment://detective.png')
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