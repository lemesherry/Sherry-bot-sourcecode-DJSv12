const { MessageEmbed } = require("discord.js");
module.exports = (message) => {
    let embed = new MessageEmbed().setColor('BLACK');
    embed.setAuthor(`Bot disconnected`);
    return message.channel.send(embed);
};