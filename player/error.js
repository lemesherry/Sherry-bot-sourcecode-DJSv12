const { MessageEmbed } = require("discord.js");
module.exports = (error, message, args) => {
    let embed = new MessageEmbed().setColor('BLACK');
    switch (error) {
        case 'NotPlaying':
            embed.setAuthor(`No music being played!`);
            message.channel.send(embed);
            break;
        case 'NotConnected':
            embed.setAuthor(`Please join a voice channel!`);
            message.channel.send(embed);
            break;
        case 'UnableToJoin':
            embed.setAuthor(`Cannot join your voice channel, please check my permissions!`);
            message.channel.send(embed);
            break;
        case 'VideoUnavailable':
            embed.setDescription(`${args[0].title} is not available in your country! Skipping...`);
            message.channel.send(embed);
            break;
        case 'MusicStarting':
            embed.setAuthor(`The music is starting... wait a moment and retry!`);
            message.channel.send(embed);
            break;
    };
};
