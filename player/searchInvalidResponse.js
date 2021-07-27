const { MessageEmbed } = require("discord.js");
module.exports = (message, tracks, content, collector) => {
    let embed = new MessageEmbed().setColor('BLACK');
    if (content === 'cancel') {
        collector.stop();
        embed.setAuthor('The search has been **cancelled**!');
    return message.channel.send(embed);
    } else {
        embed.setDescription(`Provide a number between \`1\` and \`${tracks.length}\``);
    return message.channel.send(embed);
    };
};