const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Music',
    utilisation: '{prefix}nowplaying',

    execute(client, message) {
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

        const track = client.player.nowPlaying(message);

        message.channel.send({
            embed: {
                color: 'BLACK',
                author: { name: track.title },
                footer: { text: 'Made by Sherry' },
                fields: [
                    { name: 'Channel', value: track.author, inline: true },

                    { name: 'Requested by', value: track.requestedBy.username, inline: true },

                    { name: 'Volume', value: client.player.getQueue(message).volume, inline: true },

                    { name: 'Progress bar', value: client.player.createProgressBar(message, { timecodes: true }), inline: true },
                ],
                thumbnail: { url: track.thumbnail },
                timestamp: new Date(),
            },
        });
    },
};