const { MessageEmbed } = require("discord.js");
module.exports = (message, track) => {
    let embed = new MessageEmbed().setColor('BLACK');
    embed.addField('Now playing', `[${track.title}](${track.url})`);
    return message.channel.send(embed);
};