const { MessageEmbed } = require("discord.js");
module.exports = (message) => {
    let embed = new MessageEmbed().setColor('BLACK');
        embed.setAuthor(`Search cancelled because you did not provide a valid number, Please search again!`);
        return message.channel.send(embed);
};