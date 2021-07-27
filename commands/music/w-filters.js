const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'w-filters',
    aliases: ['filters'],
    category: 'Music',
    utilisation: '{prefix}w-filters',

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

        const filtersStatuses = [[], []];

        client.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " - " + (client.player.getQueue(message).filters[filterName] ? client.emotes.on : client.emotes.off));
        });

        message.channel.send({
            embed: {
                color: 'BLACK',
                footer: { text: 'Made by Sherry' },
                fields: [
                    { name: 'Filters info', value: filtersStatuses[0].join('\n'), inline: true },
                    { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
                ],
                timestamp: new Date(),
                description: `filters that are enabled or disabled.\nUse \`${client.config.discord.prefix}filter or ${client.config.discord.prefix}f \` to add a filter to a song.`,
            },
        });
    },
};