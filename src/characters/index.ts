import Butler from './Butler'
import Clairvoyant from './Clairvoyant'
import Courtesan from './Courtesan'
import Cuirasse from './Cuirasse'
import Detective from './Detective'
import GameCharacter from './GameCharacter'
import Master from './Master'
import Steward from './Steward'
import Vigilante from './Vigilante'

const butler = new Butler()
const clairvoyant = new Clairvoyant()
const courtesan = new Courtesan()
const cuirasse = new Cuirasse()
const detective = new Detective()
const master = new Master()
const steward = new Steward()
const vigilante = new Vigilante()

export const CharacterList: Array<GameCharacter> = [butler, clairvoyant, courtesan, cuirasse, detective, master, steward, vigilante]
export const GuestList: Array<GameCharacter> = [clairvoyant, cuirasse, detective, vigilante]
export const HostList: Array<GameCharacter> = [butler, master, steward]
export const NeutralList: Array<GameCharacter> = [courtesan]
