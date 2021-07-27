const { MessageEmbed } = require("discord.js");
module.exports = (message, playlist) => {
    let embed = new MessageEmbed().setColor('BLACK');
    embed.setTitle(`Queued`)
    .addField(`${playlist.title}`, `**${playlist.tracks.length}** songs`, true);
    return message.channel.send(embed);
};