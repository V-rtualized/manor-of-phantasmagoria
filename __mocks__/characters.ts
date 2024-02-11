import { AttachmentBuilder, EmbedBuilder } from 'discord.js'

const CharacterData1 = {
	name: 'Character1',
	team: 'Team1',
	position: 'Pos1',
	color: '#FF0000',
}

class Character1 {
	static readonly description = new EmbedBuilder().setTitle('test').setDescription('test')
	static readonly image = new AttachmentBuilder('test')
}

const CharacterData2 = {
	name: 'Character2',
	team: 'Team2',
	position: 'Pos2',
	color: '#00FF00',
}

class Character2 {
	static readonly description = new EmbedBuilder().setTitle('test').setDescription('test')
	static readonly image = new AttachmentBuilder('test')
}

const CharacterData3 = {
	name: 'Character3',
	team: 'Team3',
	position: 'Pos3',
	color: '#0000FF',
}

class Character3 {
	static readonly description = new EmbedBuilder().setTitle('test').setDescription('test')
	static readonly image = new AttachmentBuilder('test')
}

export const CharacterList = [CharacterData1, CharacterData2, CharacterData3]
const CharacterClassList: { name: string, description: EmbedBuilder, image: AttachmentBuilder }[] = [Character1, Character2, Character3]

const findCharacterByName = (list: Array<any>, name: string) => {
	const character = list.find(gc => gc.name === name)
	return character === undefined ? null : character
}

export const gameCharacterDataFromName = (name: string) => findCharacterByName(CharacterList, name)

export const gameCharacterDescriptionFromName = (name: string) => {
	const character = findCharacterByName(CharacterClassList, name)
	return character ? character.description : null
}

export const gameCharacterImageFromName = (name: string) => {
	const character = findCharacterByName(CharacterClassList, name)
	return character ? character.image : null
}
