import DiscordJS, { MessageAttachment } from 'discord.js';
import { key } from '../main';

export function denick(message: DiscordJS.Message, args: string[]): void {
    const nick = args[2];
    if (nick === undefined) {
        message.reply("Please provide a nickname to denick");
        return;
    }
    console.log(key);
    const denicked = fetch(`http://api.antisniper.net/denick?key=${key}&nick=${nick}`).then(data => data.json());
    const reply = message.reply("Denicking...");
    denicked.then(data => {
        reply.then(async (msg) => {
            if ( !data.success ) {
                msg.edit(`Failed to denick ${nick}`);
            }
            if (data.success) {
                if ( !data.player?.ign ) {
                    msg.edit(`Can't find a nick of player ${nick}`);
                    return;
                }
                msg.edit({ content: `${nick}'s ign is \`${data.player?.ign}\`` });
            } else {
                msg.edit(`Failed to denick ${nick}`);
            }
        });
    });
}