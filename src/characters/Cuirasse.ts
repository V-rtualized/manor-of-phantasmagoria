import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, Snowflake } from 'discord.js'
import GameCharacter, { GameCharacterData } from './GameCharacter'

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
		return new EmbedBuilder()
			.setColor(CuirasseData.color)
			.setTitle(CuirasseData.name)
			.addFields({
				name: 'Team', value: CuirasseData.team, inline: true,
			}, {
				name: 'Investigation Result', value: `${CuirasseData.position} Role`, inline: true,
			}, {
				name: 'Win Condition', value: 'All *Hosts* are eliminated', inline: true,
			}, {
				name: '\u200B', value: '\u200B',
			}, {
				name: 'Night Ability', value: 'Choose someone to protect with their life, or protect themselves once',
			}, {
				name: 'Ability Conditions', value: 'Visits their target, can target themselves once per game',
			}, {
				name: 'Additional Information', value: 'If they protect someone other than themselves that gets attacked, the *Cuirasse* and the attacker die instead',
			})
			.setThumbnail('attachment://cuirasse.png')
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