import emoji from 'node-emoji'

export default function getEmoji(name: string): string {
	return emoji.get(name)
}
