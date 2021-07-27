const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
module.exports = {
    name: 'lyrics',
    aliases: ['ly'],
    category: 'Music',
    utilisation: '{prefix}lyrics',

    async execute(client, message, args) {
        const queue = client.player.getQueue(message);
        const track = client.player.nowPlaying(message);
        if (!queue) {
            embed.setAuthor("No music in the queue");
            return message.channel.send(embed).catch(console.error);
          };
    
        let lyrics = null;
        if (!args[0])try {
            lyrics = await lyricsFinder(track.title, "");
            if (!lyrics) lyrics = `No lyrics found for \`${track.title}.\``;
          } catch (error) {
            lyrics = `No lyrics found for \`${track.title}.\``;
                
            let lyricsEmbed = new MessageEmbed()
            .setTitle("Lyrics")
            .setDescription(lyrics)
            .setColor("BLACK")
            .setTimestamp();
  
            if (lyricsEmbed.description.length >= 2048)
            lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
            return message.channel.send(lyricsEmbed).catch(console.error);

        } else try {
          lyrics = await lyricsFinder(args.join(" "), "");
          if (!lyrics) lyrics = `No lyrics found for your search.`;
         } catch (error) {
          lyrics = `No lyrics found for your search.`;
         }
    
         let lyricsEmbed = new MessageEmbed()
          .setTitle("Lyrics")
          .setDescription(lyrics)
          .setColor("BLACK")
          .setTimestamp();
    
         if (lyricsEmbed.description.length >= 2048)
         lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
         return message.channel.send(lyricsEmbed).catch(console.error);
      },
    };