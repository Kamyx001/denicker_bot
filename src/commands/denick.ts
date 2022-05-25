import DiscordJS, { MessageAttachment } from 'discord.js';
import { key } from '../main';
import Canvas from '@napi-rs/canvas';
import { readFile } from 'fs/promises';

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
            // if ( !data.player.ign ) {
            //     msg.edit(`Can't find a nick of player ${nick}`);
            //     return;
            // }
            if (data.success) {
                if ( !data.player?.ign ) {
                    msg.edit(`Can't find a nick of player ${nick}`);
                    return;
                }
                const canvas = Canvas.createCanvas(400, 200);
		        const context = canvas.getContext('2d');

                const backgroundFile = await readFile('./background.jpg');
                const background = new Canvas.Image();
                background.src = backgroundFile;
                
                context.drawImage(background, 0, 0, canvas.width, canvas.height);

                context.font = '20px sans-serif';
                context.fillStyle = '#ffffff';
                context.fillText("nick:", 30, 40);

                context.font = '30px sans-serif';
                context.fillStyle = '#ff6f11';
                context.fillText(nick, 30, 80);

                context.font = '20px sans-serif';
                context.fillStyle = '#ffffff';
                context.fillText("IGN:", 30, 120);

                context.font = '30px sans-serif';
                context.fillStyle = '#ff504f';
                context.fillText(data.player?.ign, 30, 160);


                // Actually fill the text with a solid color

                const attachment = new MessageAttachment(canvas.toBuffer('image/png'), 'profile-image.png');
                msg.edit({ content: ` `, files: [attachment] });
            } else {
                msg.edit(`Failed to denick ${nick}`);
            }
        });
    });
}