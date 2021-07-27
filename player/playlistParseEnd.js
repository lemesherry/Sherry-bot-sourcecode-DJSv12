const { MessageEmbed } = require("discord.js");
module.exports = (message) => {
    let embed = new MessageEmbed().setColor('BLACK');
        embed.setAuthor(`Parsed playlist`);
        return message.channel.send(embed);
};