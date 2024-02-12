import { Collection } from 'discord.js'

export const collectionToValuesArray = <T> (col: Collection<any, T>): T[] => Array.from(col.values())