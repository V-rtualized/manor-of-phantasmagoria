import { enqueueOperation, get, getIsProcessingQueue, set } from '../dbCore'

jest.mock('kysely', () => ({
	Kysely: jest.fn().mockImplementation(() => {
		const chain = {
			selectFrom: jest.fn().mockReturnThis(),
			selectAll: jest.fn().mockReturnThis(),
			where: jest.fn().mockReturnThis(),
			executeTakeFirst: jest.fn().mockResolvedValue(null),
			updateTable: jest.fn().mockReturnThis(),
			set: jest.fn().mockReturnThis(),
			insertInto: jest.fn().mockReturnThis(),
			values: jest.fn().mockReturnThis(),
			execute: jest.fn().mockResolvedValue(null),
		}
		return chain
	}),
	PostgresDialect: jest.fn(),
}))

jest.mock('pg', () => ({
	Pool: jest.fn(() => ({
		connect: jest.fn().mockResolvedValue({
			release: jest.fn(),
		}),
	})),
}))

describe('dbCore - enqueueOperation and processQueue', () => {
	it('processes each operation exactly once', async () => {
		const mockOperation = jest.fn().mockResolvedValue('Operation done')

		enqueueOperation(mockOperation)
		await new Promise(process.nextTick)

		expect(mockOperation).toHaveBeenCalledTimes(1)
	})
	it('continues processing the queue even if an operation fails', async () => {
		const mockOperation1 = jest.fn().mockRejectedValue(new Error('Operation 1 failed'))
		const mockOperation2 = jest.fn().mockResolvedValue('Operation 2 done')

		enqueueOperation(mockOperation1)
		enqueueOperation(mockOperation2)

		await new Promise(process.nextTick)

		expect(mockOperation1).toHaveBeenCalled()
		expect(mockOperation2).toHaveBeenCalled()
	})
	it('sets isProcessingQueue correctly', async () => {
		const mockOperation = jest.fn().mockResolvedValue('Operation done')

		enqueueOperation(mockOperation)
		expect(getIsProcessingQueue()).toBe(true)

		await new Promise(process.nextTick)

		expect(getIsProcessingQueue()).toBe(false)
	})
})

describe('dbCore - get', () => {
	it('should retrieve data correctly', async () => {
		const expectedResult = { id: 1, name: 'Test Player' }
		const db = (await import('../dbCore')).db as any

		db.executeTakeFirst.mockResolvedValue(expectedResult)

		const result = await get<{ id: number; name: string }>('Players', {
			lhs: 'id', op: '=', rhs: 1,
		})

		expect(result).toEqual(expectedResult)
	})
	it('constructs the query correctly', async () => {
		const db = (await import('../dbCore')).db as any

		await get<{ id: number; name: string }>('Players', {
			lhs: 'id', op: '=', rhs: 1,
		})

		expect(db.selectFrom).toHaveBeenCalledWith('Players')
		expect(db.selectAll).toHaveBeenCalled()
		expect(db.where).toHaveBeenCalledWith('id', '=', 1)
		expect(db.executeTakeFirst).toHaveBeenCalled()
	})
	it('should properly reject on database errors', async () => {
		const mockError = new Error('Test database error')
		const db = (await import('../dbCore')).db as any

		db.selectFrom().selectAll().where().executeTakeFirst.mockRejectedValue(mockError)

		expect(get<{ id: number; name: string }>('Players', { lhs: 'id', op: '=', rhs: 1 })).rejects.toThrow(mockError)
	})
	it('returns null if no record is found', async () => {
		const db = (await import('../dbCore')).db as any
		db.executeTakeFirst.mockResolvedValueOnce(null)

		const result = await get('Players', { lhs: 'id', op: '=', rhs: 'non-existent-id' })

		expect(result).toBeNull()
	})
})

describe('dbCore - set', () => {
	it('inserts data correctly when no existing record is found', async () => {
		const db = (await import('../dbCore')).db as any

		db.executeTakeFirst.mockResolvedValueOnce(null)
		db.execute.mockResolvedValueOnce(undefined)

		const data = { name: 'New Player', status: 'ALIVE' }
		await set('Players', data, { lhs: 'id', op: '=', rhs: 1 })

		expect(db.insertInto).toHaveBeenCalledWith('Players')
		expect(db.values).toHaveBeenCalledWith(data)
		expect(db.execute).toHaveBeenCalled()
	})
	it('updates data correctly when an existing record is found', async () => {
		const db = (await import('../dbCore')).db as any

		db.executeTakeFirst.mockResolvedValueOnce({ id: 1, name: 'Existing Player' })
		db.execute.mockResolvedValueOnce(undefined)

		const data = { status: 'DEAD' }
		await set('Players', data, { lhs: 'id', op: '=', rhs: 1 })

		expect(db.updateTable).toHaveBeenCalledWith('Players')
		expect(db.set).toHaveBeenCalledWith(data)
		expect(db.where).toHaveBeenCalledWith('id', '=', 1)
		expect(db.execute).toHaveBeenCalled()
	})
	it('should properly reject on database errors', async () => {
		const mockError = new Error('Test database error')
		const db = (await import('../dbCore')).db as any

		db.executeTakeFirst.mockRejectedValue(mockError)

		await expect(set('Players', { name: 'New Player' }, { lhs: 'id', op: '=', rhs: 1 })).rejects.toThrow(mockError)
	})
})
