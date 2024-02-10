import { Client, Events, Interaction } from 'discord.js'
import { BotEvent } from '../types'

const event : BotEvent = {
	name: Events.InteractionCreate,
	execute: (client: Client, interaction: Interaction) => {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName)
			const cooldown = interaction.client.cooldowns.get(`${interaction.commandName}-${interaction.user.username}`)
			if (!command) return
			if (command.cooldown && cooldown) {
				if (Date.now() < cooldown) {
					interaction.reply(`You have to wait ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} second(s) to use this command again.`)
					setTimeout(() => {
						interaction.deleteReply()
					}, 5000)
					return
				}
				interaction.client.cooldowns.set(`${interaction.commandName}-${interaction.user.username}`, Date.now() + command.cooldown * 1000)
				setTimeout(() => {
					interaction.client.cooldowns.delete(`${interaction.commandName}-${interaction.user.username}`)
				}, command.cooldown * 1000)
			}
			else if (command.cooldown && !cooldown) {
				interaction.client.cooldowns.set(`${interaction.commandName}-${interaction.user.username}`, Date.now() + command.cooldown * 1000)
			}
			command.execute(interaction)
		}
	},
}

export default event