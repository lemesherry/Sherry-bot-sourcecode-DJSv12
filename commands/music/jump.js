const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'jump',
    aliases: ['jumpto'],
    category: 'Music',
    utilisation: '{prefix}loop \n =loop queue',

    execute(client, message, args) {
        let embed = new MessageEmbed().setColor('BLACK');
        const queue = client.player.getQueue(message);
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

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > queue.tracks.length){
            embed.setDescription(`Please enter a number between \`1\` to \`${queue.tracks.length}\``);
            return message.channel.send(embed);
        };
        const song = parseInt(args[0])-1;
        const success = client.player.jump(message, song);

        if (success){
            embed.setDescription(`**Jumped** to song no. ${args[0]} - ☑`);
            return message.channel.send(embed);
        };
    },
};