import DiscordJS from 'discord.js'

export function help(message: DiscordJS.Message): void {
    message.reply({ embeds: [] })
}