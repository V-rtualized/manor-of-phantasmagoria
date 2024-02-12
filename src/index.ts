import { config } from 'dotenv'

if (process.env.NODE_ENV === undefined) config()

import('./modules/discord/discordCore').then(({ initClient }) => initClient())
