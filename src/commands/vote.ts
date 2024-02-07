import { SlashCommandBuilder, EmbedBuilder, SlashCommandUserOption } from 'discord.js'
import { getThemeColor } from '../functions'
import { SlashCommand } from '../types'
import GameState from '../services/GameState'
import PlayerState from '../services/PlayerState'

const command : SlashCommand = {
	// @ts-ignore
	command: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Vote to execute a player')
		.addUserOption(new SlashCommandUserOption()
			.setName('target')
			.setDescription('Player to put up for vote')
			.setRequired(true)),
	execute: interaction => {
		const target = interaction.options.get('target')

		if (!interaction.member || !PlayerState.isAlive(interaction.member.user.id)) {
			interaction.reply({ content: 'Voting only allowed by alive players' })
			return
		}

		if (GameState.state !== 'DAY') {
			interaction.reply({ content: 'Voting only allowed during the day' })
			return
		}

		if (target === null || target.user === undefined) {
			interaction.reply({ content: 'Invalid target' })
			return
		}

		if (!PlayerState.isAlive(target.user.id)) {
			interaction.reply({ content: 'Voting only allowed against targets who are alive' })
		}

		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setDescription('Error: Not Implemented (vote)')
					.setColor(getThemeColor('text')),
			],
		})
	},
}

export default command