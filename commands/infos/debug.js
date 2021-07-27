const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'debug',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}debug',

    execute(client, message) {
        let embed = new MessageEmbed().setColor('BLACK');
        if (message.author.id == 584534092901646346 || message.author.id == 603948445362946084){
            embed.setDescription(`${client.user.username} connected in **${client.voice.connections.size}** channel(s)!`);
            return message.channel.send(embed);
        } else{
            embed.setDescription(`I am sorry honey! but my **owners** <@584534092901646346> <@603948445362946084> said don't talk to strangers 👀`);
            return message.channel.send(embed);
        };
    },
};