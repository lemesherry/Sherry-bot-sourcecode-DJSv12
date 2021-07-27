const { MessageEmbed } = require("discord.js");
module.exports = (message) => {
    let embed = new MessageEmbed().setColor('BLACK');
        embed.setAuthor(`Queue Ended`);
        return message.channel.send(embed);
};