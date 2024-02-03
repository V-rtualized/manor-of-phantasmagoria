import { SlashCommandBuilder, EmbedBuilder, SlashCommandUserOption } from 'discord.js'
import { getThemeColor } from '../functions'
import { SlashCommand } from '../types'
import State from '../services/State'

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

		if (State === null) {
			interaction.reply({ content: 'Cannot start a vote: State not initialized' })
			return
		}

		if (!interaction.member || !State.isAlive(interaction.member.user.id)) {
			interaction.reply({ content: 'Voting only allowed by alive players' })
			return
		}

		if (State.state !== 'DAY') {
			interaction.reply({ content: 'Voting only allowed during the day' })
			return
		}

		if (target === null || target.user === undefined) {
			interaction.reply({ content: 'Invalid target' })
			return
		}

		if (!State.isAlive(target.user.id)) {
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