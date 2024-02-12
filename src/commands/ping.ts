import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'
import { getThemeColor } from '../utils/colorUtils'
import { SlashCommand } from '../types'

const command : SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Shows the bot\'s ping'),
	execute: interaction => {
		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setDescription(`Pong! \n Ping: ${interaction.client.ws.ping}`)
					.setColor(getThemeColor('primary')),
			],
		})
	},
	cooldown: 10,
}

export default command