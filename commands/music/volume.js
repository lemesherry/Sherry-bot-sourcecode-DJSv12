const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'volume',
    aliases: ['v'],
    category: 'Music',
    utilisation: '{prefix}volume [1-150]',

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

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity'){
            embed.setAuthor(`Specify a valid number!`);
            return message.channel.send(embed);
        };

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 150){
            embed.setDescription(`Please enter a number between \`1\` to \`150\``);
            return message.channel.send(embed);
        };

        const success = client.player.setVolume(message, parseInt(args[0]));

        if (success){
            embed.setDescription(`Volume set to **${parseInt(args[0])}%** ! - ☑`);
            return message.channel.send(embed);
        };
    },
};