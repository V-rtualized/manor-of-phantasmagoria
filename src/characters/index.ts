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

export const gameCharacterDataFromName = (name: string): GameCharacterData | undefined => CharacterList.find(gc => gc.name === name)
export const gameCharacterDescriptionFromName = (name: string): EmbedBuilder | undefined => CharacterClassList.find(gc => gc.name === name)?.description
export const gameCharacterImageFromName = (name: string): AttachmentBuilder | undefined => CharacterClassList.find(gc => gc.name === name)?.image
