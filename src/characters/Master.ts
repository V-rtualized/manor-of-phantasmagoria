import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, Snowflake } from 'discord.js'
import GameCharacter, { GameCharacterData } from './GameCharacter'

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
		return new EmbedBuilder()
			.setColor(MasterData.color)
			.setTitle(MasterData.name)
			.addFields({
				name: 'Team', value: MasterData.team, inline: true,
			}, {
				name: 'Investigation Result', value: `${MasterData.position} Role`, inline: true,
			}, {
				name: 'Win Condition', value: 'All *Guests* are eliminated', inline: true,
			}, {
				name: '\u200B', value: '\u200B',
			}, {
				name: 'Night Ability', value: 'Choose someone to kill',
			}, {
				name: 'Ability Conditions', value: 'Visits their target, cannot target *Hosts*',
			})
			.setThumbnail('attachment://master.png')
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