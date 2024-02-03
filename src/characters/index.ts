import { ButlerData } from './Butler'
import { ClairvoyantData } from './Clairvoyant'
import { CourtesanData } from './Courtesan'
import { CuirasseData } from './Cuirasse'
import { DetectiveData } from './Detective'
import { GameCharacterData } from './GameCharacter'
import { MasterData } from './Master'
import { StewardData } from './Steward'
import { VigilanteData } from './Vigilante'

export const CharacterList: Array<GameCharacterData> = [ButlerData, ClairvoyantData, CourtesanData, CuirasseData, DetectiveData, MasterData, StewardData, VigilanteData]


export const gameCharacterDataFromName = (name: string): GameCharacterData | undefined => CharacterList.find(gc => gc.name === name)
