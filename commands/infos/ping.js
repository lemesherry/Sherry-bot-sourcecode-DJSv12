const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}ping',

    execute(client, message) {
        let embed = new MessageEmbed().setColor('BLACK');
        if (message.author.id == 584534092901646346 || message.author.id == 603948445362946084){
            embed.setDescription(`Ping is : **${client.ws.ping}miliseconds**!`);
            return message.channel.send(embed);
            } else{
                embed.setDescription(`I am sorry honey! but my **owners** <@584534092901646346> <@603948445362946084> said don't talk to strangers 👀`);
                return message.channel.send(embed);
            };
    },
};