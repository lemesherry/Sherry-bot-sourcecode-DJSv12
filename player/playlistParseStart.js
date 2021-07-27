const { MessageEmbed } = require("discord.js");
module.exports = (message) => {
    let embed = new MessageEmbed().setColor('BLACK');
        embed.setAuthor(`Parsing playlist please wait`);
        return message.channel.send(embed);
};