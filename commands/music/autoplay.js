const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'autoplay',
    aliases: ['ap'],
    category: 'Music',
    utilisation: '{prefix}autoplay',

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

        if (client.player.getQueue(message).autoPlay){
            client.player.setAutoPlay(message, false);
            embed.setDescription(`Autoplay is **disabled** - ☑`);
            return message.channel.send(embed);
        } else {
            client.player.setAutoPlay(message, true);
            embed.setDescription(`Autoplay is **enabled** - ☑`);
            return message.channel.send(embed);
        };
    },
};