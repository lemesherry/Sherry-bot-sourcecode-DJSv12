const { MessageEmbed } = require("discord.js");
module.exports = (message, query) => {
    let embed = new MessageEmbed().setColor('BLACK');
    embed.setDescription(`No results found for ${query}!`);
    return message.channel.send(embed);
};