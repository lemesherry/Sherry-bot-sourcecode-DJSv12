const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'filter',
    aliases: ['f'],
    category: 'Music',
    utilisation: '{prefix}filter [filter name]',

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

        if (!args[0]){
            embed.setAuthor(`Please type in filter name along with command!`);
            return message.channel.send(embed);
        };

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate){
            embed.setDescription(`Cannot find that filter, type \`${client.config.discord.prefix}help\``);
            return message.channel.send(embed);
        };

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]){
            embed.setDescription(`**Adding** the filter to music, wait a moment... - ${client.emotes.music}`);
            return message.channel.send(embed);
        } else{
            embed.setDescription(`**Removing** the filter on music, wait a moment... - ${client.emotes.music}`);
            return message.channel.send(embed);
        };
    },
};