import { ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter, { Investigated } from './GameCharacter'

class Butler extends GameCharacter {

	private _target: Snowflake | undefined
	private _selectedRole: Investigated | undefined
	private _selectedVisitors: Snowflake[] | undefined

	constructor() {
		super('Butler', 'HOST', 'SUPPORT', '#191970')
	}

	get description() {
		return `**Team:** *Hosts*

**Night Ability:** Change the perceived role and visitors of someone else when they are observered by other characters

**Investigation Result:** *Support* Role

**Win Condition:** All *Guests* are eliminated

**Ability Conditions:** Visits their target, cannot target *Hosts*

**Additional Information:** Selects target, role, and visitors. If target is *Investigated* they will be shown as chosen role. If target is *Watched* they will be shown as visited by chosen visitor, as well as the *Butler*. Becomes the *Steward* if the *Master* dies`
	}

	selectAction(interaction: ChatInputCommandInteraction): boolean {
		interaction.reply({ content: 'Hello' })
		return true
	}

	clean(): void {
		this._target = undefined
		this._selectedRole = undefined
		this._selectedVisitors = undefined
	}

	onWinCheck = (): boolean => false
}

export default Butler