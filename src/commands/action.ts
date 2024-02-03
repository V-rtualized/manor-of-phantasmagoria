import { SlashCommandBuilder, GuildTextBasedChannel } from 'discord.js'
import { SlashCommand } from '../types'
import Clairvoyant from '../characters/Clairvoyant'

const command : SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('action')
		.setDescription('Opens the menu to select options for your character\'s night action'),
	execute: interaction => {
		if ((interaction.channel as GuildTextBasedChannel).name !== 'personal') {
			interaction.reply({ ephemeral: true, content: 'Cannot use this command in this channel. Use in #personal' })
			return
		}

		new Clairvoyant().selectAction(interaction)
	},
}

export default command