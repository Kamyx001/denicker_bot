import DiscordJS, { Intents } from 'discord.js';
import { CommandHandler } from "./CommandHandler";
import dotenv from 'dotenv';

dotenv.config();

console.log("[Main] Initializing...");

export const key = process.env.KEY;
const token = process.env.DISCORD_TOKEN;

console.log(key, token);

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
});

new CommandHandler( client );

client.login( token );