import DiscordJS, { Channel, Intents } from 'discord.js';
import config from '../config.json';
import commandList from '../commandList.json';
import { denick } from './commands/denick';

export class CommandHandler {
    client: DiscordJS.Client;
    
    constructor(client: DiscordJS.Client) {
        console.log(`[CommandHandler] Initializing...`);
        this.client = client;
        this.client.on('messageCreate', (message) => {
            if (message.author.bot) {
                return;
            }
            if (message.content.startsWith(config.prefix)) {
                const args: string[] = message.content.slice(config.prefix.length).split(/ +/);
                if (args === undefined || args.length === 0) {
                    message.reply("Use .s help command to see available commands");
                    return;
                }
                const commandName = args[1].toLowerCase();
                if (!commandList.includes(commandName)) {
                    message.reply("Use \`.s help\` command to see available commands"); return;
                    return;
                }
                if (commandName === "denick") {
                    try {
                        denick(message, args);
                    }
                    catch (error) {
                        console.error(error);
                        message.reply('there was an error trying to execute that command!');
                    }
                }
            }
        });
    }
    
}