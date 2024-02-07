import { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ChatInputCommandInteraction, CacheType, ButtonStyle, ButtonInteraction } from 'discord.js'
import { SlashCommand } from '../types'
import { CharacterList, gameCharacterDescriptionFromName, gameCharacterImageFromName } from '../characters'

const command : SlashCommand = {
	// @ts-ignore Not sure why it wants this
	command: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Check the info on a specific character or all characters')
		.addStringOption(option =>
			option.setName('character')
				.setDescription('The character to check the description of. Leave blank to check all.')
				.addChoices(
					...CharacterList.map(c => ({ name: c.name, value: c.name })),
				)),
	execute: async interaction => {
		const characterName = interaction.options.getString('character')

		if (characterName) {
			const CharacterData = CharacterList.find(c => c.name === characterName)

			if (CharacterData === undefined) {
				await interaction.reply({ content: 'An unknown error occurred' })
				return
			}

			const embed = gameCharacterDescriptionFromName(CharacterData.name)

			if (embed === null) {
				throw new Error('Character description undefined')
			}

			await interaction.reply({ embeds: [embed] })
			return
		}

		await replyCharacterList(interaction, 0, true)

	},
}

const replyCharacterList = async (interaction: ChatInputCommandInteraction<CacheType> | ButtonInteraction, index: number, init: boolean) => {
	const image = gameCharacterImageFromName(CharacterList[index].name)

	const embed = gameCharacterDescriptionFromName(CharacterList[index].name)
		?.setTimestamp()
		.setFooter({ text: 'The functionality of this message expires in 5 minutes' })

	if (image === null || embed === undefined) {
		throw new Error('Character description undefined')
	}

	const row = new ActionRowBuilder<ButtonBuilder>()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('back')
				.setLabel('<')
				.setDisabled(index === 0)
				.setStyle(ButtonStyle.Primary),
			new ButtonBuilder()
				.setCustomId('next')
				.setLabel('>')
				.setDisabled(index === CharacterList.length - 1)
				.setStyle(ButtonStyle.Primary),
		)

	const response = init ? await interaction.reply({ embeds: [embed], files: [image], components: [row] }) : await (interaction as ButtonInteraction).update({ embeds: [embed], files: [image], components: [row] })

	try {
		const selection: ButtonInteraction = await response.awaitMessageComponent({ time: 300_000 }) as ButtonInteraction

		if (selection.customId == 'back') {
			replyCharacterList(selection, --index, false)
		}
		else {
			replyCharacterList(selection, ++index, false)
		}
	}
	catch (err) {
		await interaction.editReply({ embeds: [embed], files: [image], components: [] })
	}
}

export default command