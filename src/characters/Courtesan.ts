import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, Snowflake } from 'discord.js'
import GameCharacter, { GameCharacterData } from './GameCharacter'

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
		return new EmbedBuilder()
			.setColor(CourtesanData.color)
			.setTitle(CourtesanData.name)
			.addFields({
				name: 'Team', value: CourtesanData.team, inline: true,
			}, {
				name: 'Investigation Result', value: `${CourtesanData.position} Role`, inline: true,
			}, {
				name: 'Win Condition', value: 'Survives until someone wins', inline: true,
			}, {
				name: '\u200B', value: '\u200B',
			}, {
				name: 'Night Ability', value: 'Choose someone to seduce and control, then choose a victim',
			}, {
				name: 'Ability Conditions', value: 'Visits their target, cannot target themselves',
			}, {
				name: 'Additional Information', value: 'The chosen target will use their night ability on the chosen victim, the chosen victim can be the Courtensan, the target will not be told they were seduced',
			})
			.setThumbnail('attachment://courtesan.png')
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