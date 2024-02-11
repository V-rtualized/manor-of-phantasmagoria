export class EmbedBuilder {
	title: string
	description: string
	color: string

	constructor() {
		this.title = ''
		this.description = ''
		this.color = ''
	}

	setTitle(title: string) {
		this.title = title
		return this
	}

	setDescription(description: string) {
		this.description = description
		return this
	}

	setColor(color: string) {
		this.color = color
		return this
	}

	setTimestamp = jest.fn(() => this)

	setFooter = jest.fn(() => this)
}

export class SlashCommandBuilder {
	name: string
	description: string

	constructor() {
		this.name = ''
		this.description = ''
	}

	setName(name: string) {
		this.name = name
		return this
	}

	setDescription(description: string) {
		this.description = description
		return this
	}

	addStringOption = jest.fn(() => this)
}

export class AttachmentBuilder {
	url: string

	constructor(url: string) {
		this.url = url
	}
}

export class ActionRowBuilder {
	components: Array<string>

	constructor() {
		this.components = []
	}

	addComponents(...components: { customId: string }[]) {
		this.components.push(...components.map(v => v.customId))
		return this
	}
}

export class ButtonBuilder {
	customId: string

	constructor() {
		this.customId = ''
	}

	setCustomId(customId: string) {
		this.customId = customId
		return this
	}

	setLabel = jest.fn(() => this)

	setDisabled = jest.fn(() => this)

	setStyle = jest.fn(() => this)
}

export const ButtonStyle = {
	Primary: '',
}

export class FakeInteraction {
	client = { ws: { ping: 123 } }
	reply = jest.fn(() => Promise.resolve(''))
	editReply = jest.fn(() => Promise.resolve(''))
	_options: { [key: string]: any }

	constructor(options?: { [key: string]: any }) {
		this._options = options ?? {}
	}

	getString = (option: string) => this._options[option]

	get options() {
		return {
			getString: this.getString,
		}
	}
}
