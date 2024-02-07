import { AttachmentBuilder, EmbedBuilder } from 'discord.js'
import Butler, { ButlerData } from './Butler'
import Clairvoyant, { ClairvoyantData } from './Clairvoyant'
import Courtesan, { CourtesanData } from './Courtesan'
import Cuirasse, { CuirasseData } from './Cuirasse'
import Detective, { DetectiveData } from './Detective'
import { GameCharacterData } from './GameCharacter'
import Master, { MasterData } from './Master'
import Steward, { StewardData } from './Steward'
import Vigilante, { VigilanteData } from './Vigilante'

export const CharacterList: GameCharacterData[] = [ButlerData, ClairvoyantData, CourtesanData, CuirasseData, DetectiveData, MasterData, StewardData, VigilanteData]
const CharacterClassList: { name: string, description: EmbedBuilder, image: AttachmentBuilder }[] = [Butler, Clairvoyant, Courtesan, Cuirasse, Detective, Master, Steward, Vigilante]

export const gameCharacterDataFromName = (name: string): GameCharacterData | null => {
	const character = CharacterList.find(gc => gc.name === name)
	if (character === undefined) return null
	return character
}

export const gameCharacterDescriptionFromName = (name: string): EmbedBuilder | null => {
	const description = CharacterClassList.find(gc => gc.name === name)?.description
	if (description === undefined) return null
	return description
}

export const gameCharacterImageFromName = (name: string): AttachmentBuilder | null => {
	const image = CharacterClassList.find(gc => gc.name === name)?.image
	if (image === undefined) return null
	return image
}

