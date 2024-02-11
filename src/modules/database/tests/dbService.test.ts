jest.mock('../dbCore', () => ({
	get: jest.fn(),
	set: jest.fn(),
}))

jest.mock('../../../utils/timeUtils', () => ({
	unixTimeInSeconds: jest.fn().mockReturnValue(1234567890),
}))

import { get, set } from '../dbCore'
import { updateGameStatePhase, resetGameState, getGameState } from '../dbService'

// TypeScript type assertions for mocks
const mockGet = get as jest.MockedFunction<typeof get>
const mockSet = set as jest.MockedFunction<typeof set>

describe('dbService - GameState handling', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('updates the game state phase correctly', async () => {
		await updateGameStatePhase('DAY')
		expect(mockSet).toHaveBeenCalledWith('GameState', {
			phase: 'DAY',
			phase_start: 1234567890,
		}, {
			lhs: 'id', op: '=', rhs: 0,
		})
	})

	it('resets the game state correctly', async () => {
		await resetGameState()
		expect(mockSet).toHaveBeenCalledWith('GameState', {
			phase: 'PREGAME',
			phase_start: 1234567890,
		}, {
			lhs: 'id', op: '=', rhs: 0,
		})
	})

	it('retrieves the game state correctly', async () => {
		const expectedState = {
			id: 0,
			phase: 'DAY',
			phase_start: 1234567890,
		}
		mockGet.mockResolvedValueOnce(expectedState)

		const gameState = await getGameState()
		expect(gameState).toEqual(expectedState)
		expect(mockGet).toHaveBeenCalledWith('GameState', {
			lhs: 'id', op: '=', rhs: 0,
		})
	})

	it('throws an error when the game state cannot be found', async () => {
		mockGet.mockResolvedValueOnce(null)
		await expect(getGameState()).rejects.toThrow('No game state')
	})
})
