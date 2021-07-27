const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    category: 'Music',
    utilisation: '{prefix}loop \n =loop queue',

    execute(client, message, args) {
        let embed = new MessageEmbed().setColor('BLACK');
        if (!message.member.voice.channel){
            embed.setAuthor(`Please join a voice channel!`);
            return message.channel.send(embed);
        };

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){
            embed.setAuthor(`You must be in the same voice channel!`);
            return message.channel.send(embed);
        };

        if (!client.player.getQueue(message)){
            embed.setAuthor(`No music in the queue!`);
            return message.channel.send(embed);
        };

        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                embed.setDescription(`Loop **disabled**! - ☑`);
                return message.channel.send(embed);
            } else {
                client.player.setLoopMode(message, true);
                embed.setDescription(`Loop **enabled** for whole queue! - 🔁`);
                return message.channel.send(embed);
            };
        } else {
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                embed.setDescription(`Loop **disabled**! - ☑`);
                return message.channel.send(embed);
            } else {
                client.player.setRepeatMode(message, true);
                embed.setDescription(`Loop **enabled** for current music! - 🔂`);
                return message.channel.send(embed);
            };
        };
    },
};