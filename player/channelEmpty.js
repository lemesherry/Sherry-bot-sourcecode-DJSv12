const { MessageEmbed } = require("discord.js");
module.exports = (message) => {
    let embed = new MessageEmbed().setColor('BLACK');
    embed.setAuthor(`Bot disconnected because there is no one in the voice channel!`);
    return message.channel.send(embed);
};