import { Snowflake } from 'discord.js'
import { GameCharacterData } from '../characters/GameCharacter'

export type Player = {
  id: Snowflake,
  room: string,
  location: string,
  inventory: Inventory,
  character: GameCharacterData,
	characterData: string
}

export type Inventory = {
	master: boolean,
	servant: boolean,
	library: boolean
}

export type Team = 'GUEST' | 'HOST' | 'NEUTRAL'
export type Guest_Position = 'INVESTIGATIVE' | 'PROTECTIVE' | 'SUPPORT' | 'KILLING' | 'OTHER'
export type Host_Position = 'SUPPORT' | 'KILLING' | 'OTHER'
export type Neutral_Position = 'EVIL' | 'BENIGN'
export type Position = Guest_Position | Host_Position | Neutral_Position