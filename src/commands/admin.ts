import { SlashCommandBuilder, PermissionFlagsBits, SlashCommandStringOption, ChatInputCommandInteraction } from 'discord.js'
import { SlashCommand } from '../types'
import { getStateInstance } from '../services/GameState'
import Database from '../services/Database'

const STATE = {
	RESET: 'RESET',
	INVITE: 'INVITE',
	F_START: 'F_START',
	F_END: 'F_END',
}

const stateSubcommand = async (interaction: ChatInputCommandInteraction) => {
	const state = interaction.options.get('state')

	const currState = getStateInstance()

	if (currState === null) {
		interaction.reply({ ephemeral: true, content: 'Error: State not initialized' })
		console.error('Error: State not initialized')
		return
	}

	interaction.reply({
		ephemeral: true,
		content: 'Updating State...',
	})
	if (state?.value === STATE.RESET) {
		await currState.reset(interaction.client)
	}
	else if (state?.value === STATE.INVITE) {
		await currState.invite(interaction.client)
	}
	else if (state?.value === STATE.F_START) {
		await currState.start(interaction.client)
	}
	else if (state?.value === STATE.F_END) {
		await currState.end(interaction.client)
	}
}

const resetdatabaseSubcommand = async (interaction: ChatInputCommandInteraction) => {
	interaction.reply({
		ephemeral: true,
		content: 'Resetting Database...',
	})
	await Database.resetDB()
	await Database.initSchema()
}

const command : SlashCommand = {
	// @ts-ignore
	command: new SlashCommandBuilder()
		.setName('admin')
		.setDescription('A group of admin commands')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addSubcommand(subcommandBuilder => subcommandBuilder
			.setName('state')
			.setDescription('Set the game to a specific state')
			.addStringOption(new SlashCommandStringOption()
				.setName('state')
				.setDescription('State to set the game to')
				.addChoices({
					name: STATE.RESET,
					value: STATE.RESET,
				}, {
					name: STATE.INVITE,
					value: STATE.INVITE,
				}, {
					name: STATE.F_START,
					value: STATE.F_START,
				}, {
					name: STATE.F_END,
					value: STATE.F_END,
				})
				.setRequired(true),
			),
		).addSubcommand(subcommandBuilder => subcommandBuilder
			.setName('resetdatabase')
			.setDescription('Removes all data and tables from the database'),
		),
	execute: async interaction => {
		switch (interaction.options.getSubcommand()) {
		case 'state':
			await stateSubcommand(interaction)
			break
		case 'resetdatabase':
			await resetdatabaseSubcommand(interaction)
			break
		}
	},
}

export default command