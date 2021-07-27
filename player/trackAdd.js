const { MessageEmbed } = require("discord.js");
module.exports = (message, track) => {
    let embed = new MessageEmbed().setColor('BLACK');
    embed.addField('Queued', `[${track.title}](${track.url})`);
    return message.channel.send(embed);
};