const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'resume',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}resume',

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

        if (!client.player.getQueue(message).paused){
            embed.setAuthor(`Already playing!`);
            return message.channel.send(embed);
        };

        const success = [ 
             client.player.resume(message),
             client.player.pause(message),
             client.player.resume(message)];

        if (success) message.react(`▶`);
    },
};