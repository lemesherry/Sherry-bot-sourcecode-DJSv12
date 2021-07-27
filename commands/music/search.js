const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'search',
    aliases: ['sr'],
    category: 'Music',
    utilisation: '{prefix}search [name/URL]',

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

        if (!args[0]){
            embed.setAuthor(`Please type the title of the song!`);
            return message.channel.send(embed);
        };

        client.player.play(message, args.join(" "));
    },
};