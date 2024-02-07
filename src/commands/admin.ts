import { SlashCommandBuilder, PermissionFlagsBits, SlashCommandStringOption, ChatInputCommandInteraction } from 'discord.js'
import { SlashCommand } from '../types'
import GameState from '../services/GameState'
import Database from '../services/Database'

const STATE = {
	RESET: 'RESET',
	INVITE: 'INVITE',
	F_START: 'F_START',
	F_END: 'F_END',
}

const stateSubcommand = async (interaction: ChatInputCommandInteraction) => {
	const state = interaction.options.get('state')

	interaction.reply({
		ephemeral: true,
		content: 'Updating State...',
	})
	if (state?.value === STATE.RESET) {
		await GameState.reset()
	}
	else if (state?.value === STATE.INVITE) {
		await GameState.invite()
	}
	else if (state?.value === STATE.F_START) {
		await GameState.start()
	}
	else if (state?.value === STATE.F_END) {
		await GameState.end()
	}
}

const resetdatabaseSubcommand = async (interaction: ChatInputCommandInteraction) => {
	interaction.reply({
		ephemeral: true,
		content: 'Resetting Database...',
	})
	await Database.reset()
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