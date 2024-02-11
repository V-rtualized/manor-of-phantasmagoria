import infoCommand from '../../src/commands/info'
import { FakeInteraction } from '../../__mocks__/discord.js'

jest.mock('discord.js')
jest.mock('../../src/characters', () => jest.requireActual('../../__mocks__/characters'))

import { CharacterList } from '../../src/characters'

describe('info command', () => {
	it('replies with interactable info embed', () => {
		expect(infoCommand.command).toEqual(
			expect.objectContaining({
				name: 'info',
				description: expect.anything(),
			}),
		)

		const interaction = new FakeInteraction({ 'character': '' })
		infoCommand.execute(interaction as any)

		expect(interaction.reply).toHaveBeenCalledWith(expect.objectContaining({
			embeds: [
				expect.objectContaining({
					title: 'test',
				}),
			],
			components: [
				expect.objectContaining({
					components: [
						'back', 'next',
					],
				}),
			],
		}))
	})

	it('replies with specific character info', () => {
		expect(infoCommand.command).toEqual(
			expect.objectContaining({
				name: 'info',
				description: expect.anything(),
			}),
		)

		const interaction = new FakeInteraction({ 'character': CharacterList[0].name })
		infoCommand.execute(interaction as any)

		expect(interaction.reply).toHaveBeenCalledWith(expect.objectContaining({
			embeds: [
				expect.objectContaining({
					title: 'test',
				}),
			],
		}))
	})
})
