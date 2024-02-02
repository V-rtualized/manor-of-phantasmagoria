import { ChatInputCommandInteraction, Snowflake } from 'discord.js'
import GameCharacter from './GameCharacter'

class Courtesan extends GameCharacter {

	private _target: Snowflake | undefined
	private _victim: Snowflake | undefined

	constructor() {
		super('Courtesan', 'NEUTRAL', 'EVIL', '#8B008B')
	}

	get description() {
		return `**Team:** *None*

**Night Ability:** Choose someone to seduce and control, then choose a victim

**Investigation Result:** *Killing* Role

**Win Condition:** Survives until someone wins

**Ability Conditions:** Visits their target, cannot target themselves

**Additional Information:** The chosen target will use their night ability on the chosen victim, the chosen victim can be the Courtensan, the target will not be told they were seduced`
	}

	selectAction(interaction: ChatInputCommandInteraction): boolean {
		interaction.reply({ content: 'Hello' })
		return true
	}

	clean(): void {
		this._target = undefined
		this._victim = undefined
	}

	onWinCheck = (): boolean => false
}

export default Courtesan