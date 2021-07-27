const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'disconnect',
    aliases: ['dc', 'leave', 'dis'],
    category: 'Music',
    utilisation: '{prefix}disconnect',

    async execute(client, message) {
        const Player = require('discord-player');
        const QueuE = new Player.Queue(client.player, message);

        let embed = new MessageEmbed().setColor('BLACK');
        if (!message.member.voice.channel){
            embed.setAuthor(`Please join a voice channel!`);
            return message.channel.send(embed);
        };

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){
            embed.setAuthor(`You must be in the same voice channel!`);
            return message.channel.send(embed);
        };
        const voicechannel = message.member.voice.channel;
        await QueuE.destroy();
        await voicechannel.leave();

        await message.react('☑');
    },
};