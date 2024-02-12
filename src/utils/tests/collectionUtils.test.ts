import { Collection } from 'discord.js'
import { collectionToValuesArray } from '../collectionUtils'

describe('collectionToValuesArray', () => {
	test('converts collection values to an array', () => {
		const mockCollection = new Collection()
		mockCollection.set('key1', 'value1')
		mockCollection.set('key2', 'value2')

		expect(collectionToValuesArray(mockCollection)).toEqual(['value1', 'value2'])
	})
})
