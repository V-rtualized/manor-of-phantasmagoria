import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, Snowflake } from 'discord.js'
import GameCharacter, { GameCharacterData } from './GameCharacter'

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
		return new EmbedBuilder()
			.setColor(VigilanteData.color)
			.setTitle(VigilanteData.name)
			.addFields({
				name: 'Team', value: VigilanteData.team, inline: true,
			}, {
				name: 'Investigation Result', value: `${VigilanteData.position} Role`, inline: true,
			}, {
				name: 'Win Condition', value: 'All *Hosts* are eliminated', inline: true,
			}, {
				name: '\u200B', value: '\u200B',
			}, {
				name: 'Night Ability', value: 'Choose someone to kill',
			}, {
				name: 'Ability Conditions', value: 'Visits their target, cannot target themselves',
			}, {
				name: 'Additional Information', value: 'If they kill a *Guest*, the Vigilante dies too',
			})
			.setThumbnail('attachment://vigilante.png')
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