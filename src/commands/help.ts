import DiscordJS, {MessageEmbed} from 'discord.js'

export function help(message: DiscordJS.Message, args: string[]): void {
    var embed = new MessageEmbed()
    message.reply({ embeds: [] })
}