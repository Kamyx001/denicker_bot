import DiscordJS from 'discord.js';
import { NickNameNotProvided } from '../errors/nicknameNotProvided';
import { key } from '../main';

export async function denick(message: DiscordJS.Message, nickname: string ) {
    if (nickname === undefined) {
        throw new NickNameNotProvided();
    }
    
    console.log(key);
    const reply = await message.reply("Denicking...");
    
    const response = await fetch(`http://api.antisniper.net/denick?key=${key}&nick=${nickname}`);
    const responseData = await response.json();

    const { success } = responseData;

    if ( !success ) {
        await reply.edit(`Failed to denick ${nickname}`);
        return;
    }

    if ( !responseData.player?.ign ) {
        await reply.edit(`Can't find a nick of player ${nickname}`);
        return;
    }

    await reply.edit({ content: `${nickname}'s ign is \`${responseData.player?.ign}\`` });
}