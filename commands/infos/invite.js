const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
module.exports = {
    name: 'invite',
    aliases: ['invitelink', 'link'],
    category: 'Infos',
    utilisation: '{prefix}invite',
    async execute(message) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#005228')
        .setTitle('Invite')
        .setURL()
        .addField("To invite Sherry", "[Click here](https://discord.com/oauth2/authorize?client_id=845208558736113684&permissions=37088600&scope=bot)")
        .addField("To invite Sherry 2", "[Click here](https://discord.com/api/oauth2/authorize?client_id=846016087695163412&permissions=37088600&scope=bot)")
        .addField("To invite Sherry 3", "[Click here](https://discord.com/api/oauth2/authorize?client_id=846016138453975060&permissions=37088600&scope=bot)")
        .addField("To invite Sherry 4", "[Click here](https://discord.com/api/oauth2/authorize?client_id=850032609543454720&permissions=37088600&scope=bot)")
        .setFooter('Made by Sherry');

        await message.channel.send(newEmbed);
    },
};