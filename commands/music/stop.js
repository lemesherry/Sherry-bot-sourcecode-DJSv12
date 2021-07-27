const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'stop',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}stop',

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

        client.player.setRepeatMode(message, false);
        const success = client.player.stop(message);

        if (success) message.react(`⏹`);
    },
};