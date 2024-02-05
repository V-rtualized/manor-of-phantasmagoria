import { SlashCommandBuilder, PermissionFlagsBits, SlashCommandStringOption } from 'discord.js'
import { SlashCommand } from '../types'
import { getStateInstance } from '../services/GameState'

const STATE = {
	RESET: 'RESET',
	INVITE: 'INVITE',
	F_START: 'F_START',
	F_END: 'F_END',
}

const command : SlashCommand = {
	// @ts-ignore
	command: new SlashCommandBuilder()
		.setName('state')
		.setDescription('Set the game to a specific state')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
			.setRequired(true)),
	execute: async interaction => {
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
	},
}

export default command