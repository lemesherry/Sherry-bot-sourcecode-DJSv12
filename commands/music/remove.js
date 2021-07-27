const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'remove',
    aliases: ['rm'],
    category: 'Music',
    utilisation: '{prefix}remove [number in the queue]',

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

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity'){
            embed.setAuthor(`Specify a valid number!`);
            return message.channel.send(embed);
        };

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > queue.tracks.length){
            embed.setDescription(`Please enter a number between \`1\` to \`${queue.tracks.length}\``);
            return message.channel.send(embed);
        };

        const song = parseInt(args[0])-1;
        const success = client.player.remove(message, song);

        if (success){
            embed.addField(`**Removed**`,`[${success.title}](${success.url})`, true)
            .setFooter(`Postion in queue ${args[0]}`);
            return message.channel.send(embed);
        };
    },
};