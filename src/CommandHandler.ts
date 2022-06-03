import DiscordJS, { Channel, Intents } from 'discord.js';
import config from '../config.json';
import commandList from '../commandList.json';
import { denick } from './commands/denick';
import { NickNameNotProvided } from './errors/nicknameNotProvided';

export class CommandHandler {
    
    constructor(
        private client: DiscordJS.Client
    ) {
        console.log(`[CommandHandler] Initializing...`);
        this.client.on('messageCreate', this.onMessageCreate );
    }

    private async onMessageCreate( message: DiscordJS.Message ) {
        if (message.author.bot) {
            return;
        }

        if (message.content.startsWith(config.prefix)) {
            const args: string[] = message.content
                .slice(config.prefix.length)
                .split(/ +/); 

            if (args === undefined || args.length === 0) {
                await message.reply("Use .s help command to see available commands");
                return;
            }

            const  [_, commandName ] = args;
            const command = commandName.toLowerCase();

            if (!commandList.includes(command)) {
                await message.reply("Use \`.s help\` command to see available commands"); 
                return;
            }

            if (command === "denick") {
                try {
                    denick(message, args[2]);
                } catch (err) {
                    if ( err instanceof NickNameNotProvided ) {
                        await message.reply("Please provide a nickname to denick");
                        return;
                    }

                    console.error(err);
                    await message.reply('there was an error trying to execute that command!');
                }
            }
        }
    }
    
}