import { get, set } from './dbCore'
import { Criteria, GameState } from './dbTypes'
import { unixTimeInSeconds } from '../../utils/timeUtils'

const STATE_ID = 0

export const updateGameStatePhase = async (newPhase: string): Promise<void> => {
	const criteria: Criteria = {
		lhs: 'id',
		op: '=',
		rhs: STATE_ID,
	}

	const data = {
		phase: newPhase,
		phase_start: unixTimeInSeconds(),
	}

	await set<Partial<GameState>>('GameState', data, criteria)
}

export const resetGameState = async (): Promise<void> => {
	const criteria: Criteria = {
		lhs: 'id',
		op: '=',
		rhs: STATE_ID,
	}

	const data = {
		phase: 'PREGAME',
		phase_start: unixTimeInSeconds(),
	}

	await set<Partial<GameState>>('GameState', data, criteria)
}

export const getGameState = async (): Promise<GameState> => {
	const criteria: Criteria = {
		lhs: 'id',
		op: '=',
		rhs: STATE_ID,
	}

	const res = await get<GameState>('GameState', criteria)

	if (res === null) {
		throw new Error('No game state')
	}

	return res
}