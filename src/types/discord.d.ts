import { SlashCommandBuilder } from '@discordjs/builders'
import { BaseCommandInteraction } from 'discord.js'

declare module 'discord.js' {
	export interface Command {
		data: SlashCommandBuilder
		execute(interaction: BaseCommandInteraction): Promise<void>
	}
}
