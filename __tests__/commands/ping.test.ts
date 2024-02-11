import pingCommand from '../../src/commands/ping'
import { FakeInteraction } from '../../__mocks__/discord.js'
import { getThemeColor } from '../../src/functions'

jest.mock('discord.js')

describe('ping command', () => {
	it('replies with ping', () => {

		expect(pingCommand.command).toEqual(
			expect.objectContaining({
				name: 'ping',
				description: expect.anything(),
			}),
		)

		const interaction = new FakeInteraction()
		pingCommand.execute(interaction as any)

		expect(interaction.reply).toHaveBeenCalledWith({
			embeds: [
				expect.objectContaining({
					description: `Pong! \n Ping: ${interaction.client.ws.ping}`,
					color: getThemeColor('primary'),
				}),
			],
		})
	})
})
