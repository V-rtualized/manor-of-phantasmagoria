import { Client, Routes, SlashCommandBuilder } from 'discord.js'
import { REST } from '@discordjs/rest'
import { readdirSync } from 'fs'
import { join } from 'path'
import { color } from '../functions'
import { SlashCommand } from '../types'

module.exports = (client : Client) => {
	const commands : SlashCommandBuilder[] = []

	const commandsDir = join(__dirname, '../commands')

	readdirSync(commandsDir).forEach(file => {
		if (!file.endsWith('.js')) return
		const command : SlashCommand = require(`${commandsDir}/${file}`).default
		commands.push(command.command)
		client.commands.set(command.command.name, command)
	})

	const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

	rest.put(Routes.applicationCommands(process.env.BOT_ID), {
		body: commands.map(command => command.toJSON()),
	})
		.then((data : any) => {
			console.log(color('primary', `Successfully loaded ${color('secondary', data.length)} slash command(s)`))
		}).catch(e => {
			console.log(e)
		})
}