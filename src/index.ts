import dotenv from 'dotenv'
import { Client, Intents } from 'discord.js'
import imageHider from './features/imageHider'
import rater from './features/rater'

dotenv.config()
const features = [imageHider, rater]

export const client = new Client({
	restTimeOffset: 0,
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
}).on('ready', () => console.log('ready!'))
await client.login(process.env.SECRET)
features.forEach(feature => feature())
