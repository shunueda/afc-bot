import { WebhookClient } from 'discord.js'
import { randomUUID } from 'crypto'
import download from 'download'
import randomSenders from '../../libs/randomSenders'
import { client } from '../..'

export default function imageHider() {
	const wh = new WebhookClient({ url: process.env.IMAGE_HIDER_URL! })
	client.on('messageCreate', message => {
		if (
			message.channel.id === process.env.IMAGE_HIDER_CHANNEL &&
			message.attachments.size > 0
		) {
			message.attachments.forEach(async attachment => {
				if (attachment.spoiler) return
				const uuid = randomUUID()
				await download(attachment.url, `assets`, {
					filename: `${uuid}.png`
				})
				await message.delete()
				const { username, avatarURL } =
					randomSenders[Math.floor(Math.random() * randomSenders.length)]
				await wh.send({
					username,
					avatarURL,
					files: [
						{
							attachment: `assets/${uuid}.png`,
							name: 'SPOILER_FILE.png'
						}
					]
				})
			})
		}
	})
}
