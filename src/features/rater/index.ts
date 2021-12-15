import { client } from '../../index'
import { Collection, Message, MessageEmbed, PartialMessage } from 'discord.js'
import { randomUUID } from 'crypto'
import download from 'download'
import getEmoji from '../../util/getEmoji'

const emojis = [
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'keycap_ten'
].map(getEmoji)

export default function rater() {
	client
		.on('messageCreate', message => {
			if (
				message.channel.id === process.env.RATING_CHANNEL &&
				message.attachments.size > 0
			) {
				message.attachments.forEach(async attachment => {
					const uuid = randomUUID()
					await download(attachment.url, `assets`, {
						filename: `${uuid}.png`
					})
					await message.delete()
					const embed = new MessageEmbed()
						.setImage(`attachment://${uuid}.png`)
						.setDescription(
							'Rate this person! You can also rate him/her as 4-5 by selecting both 4 and 5. Please be patient because it may take up to 1 sec for the score to be reflected.'
						)
					const display = await message.channel.send({
						embeds: [embed],
						files: [`assets/${uuid}.png`]
					})
					emojis.forEach(emoji => display.react(emoji))
				})
			}
		})
		.on('messageReactionAdd', async (reaction, user) => {
			if (user.bot) return
			if (!emojis.includes(reaction.emoji.name!)) return
			await refreshScore(reaction.message)
		})
		.on('messageReactionRemove', async (reaction, user) => {
			if (user.bot) return
			if (!emojis.includes(reaction.emoji.name!)) return
			await refreshScore(reaction.message)
		})
}

async function refreshScore(message: Message | PartialMessage) {
	await message.fetch()
	let reactionCountSum = 0
	const scoreMap = new Collection<string, number[]>()
	const sum = await [...message.reactions.cache.values()]
		.map(async reaction => {
			if (emojis.includes(reaction.emoji.name!)) {
				await reaction.users.fetch()
				const score = emojis.indexOf(reaction.emoji.name!) + 1
				;[...reaction.users.cache.values()].forEach(user => {
					if (user.id !== process.env.CLIENT_ID) {
						try {
							scoreMap.get(user.username)!.push(score)
						} catch (e) {
							scoreMap.set(user.username, [score])
						}
					}
				})
				const reactionCount = reaction.count - 1
				reactionCountSum += reactionCount
				return reactionCount * score
			}
			return 0
		})
		.reduce(async (prev, curr) => (await prev) + (await curr))
	const embed = new MessageEmbed()
		.setDescription(
			'Rate this person! You can also rate him/her as, for example, 4-5 by selecting both 4 and 5. Please be patient as it may take up to 1 sec for the score to be reflected.'
		)
		.addField(
			[...scoreMap.entries()]
				.map(([name, score]) => {
					return `${name}: ${
						score.reduce((prev, curr) => prev + curr) / score.length
					}\n`
				})
				.join(''),
			`Average: ${sum / reactionCountSum}`,
			true
		)
	await message.edit({ embeds: [embed] })
}
