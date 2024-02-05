import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, Snowflake } from 'discord.js'
import GameCharacter, { GameCharacterData } from './GameCharacter'

export const StewardData: GameCharacterData = {
	name: 'Steward',
	team: 'HOST',
	position: 'KILLING',
	color: '#006400',
}

class Steward extends GameCharacter {

	private _target: Snowflake | undefined

	constructor() {
		super(StewardData)
	}

	static get image() {
		return new AttachmentBuilder('./assets/steward.png')
	}

	static get description() {
		return new EmbedBuilder()
			.setColor(StewardData.color)
			.setTitle(StewardData.name)
			.addFields({
				name: 'Team', value: StewardData.team, inline: true,
			}, {
				name: 'Investigation Result', value: `${StewardData.position} Role`, inline: true,
			}, {
				name: 'Win Condition', value: 'All *Guests* are eliminated', inline: true,
			}, {
				name: '\u200B', value: '\u200B',
			}, {
				name: 'Night Ability', value: 'Choose someone to kill',
			}, {
				name: 'Ability Conditions', value: 'Visits their target, cannot target *Hosts*',
			}, {
				name: 'Additional Information', value: 'This role is not given at the start of the game',
			})
			.setThumbnail('attachment://steward.png')
	}

	canBeSelected = (): boolean => false

	selectAction(interaction: ChatInputCommandInteraction): boolean {
		interaction.reply({ content: 'Hello' })
		return true
	}

	clean(): void {
		this._target = undefined
	}

	onWinCheck = (): boolean => false
}

export default Steward