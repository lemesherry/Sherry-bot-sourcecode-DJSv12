const { MessageEmbed } = require("discord.js");
const { config } = require("process");
module.exports = {
  name: 'queue',
  aliases: ['q', 'list'],
  category: 'Music',
  description: 'Get all the queued songs list',
  utilisation: '{prefix}queue',
  async execute(client, message) {
    let embed = new MessageEmbed().setColor('BLACK');
    const { channel } = message.member.voice;

    if (!channel) {
      embed.setAuthor(
        "Please join a voice channel!"
      );
      return message.channel.send(embed);
    }

    const { notsamechannel } = message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id;

    if (notsamechannel){
     embed.setAuthor(`You must be in the same voice channel!`);
     return message.channel.send(embed);
    }

    const queue = client.player.getQueue(message);

    if (!queue) {
      embed.setAuthor("No music in the queue");
      return message.channel.send(embed);
    }

    let currentPage = 0;
    const embeds = generateQueueEmbed(message, queue);

    const queueEmbed = await message.channel.send(
      `> **__Page:__** **${currentPage + 1}** **__Of__** **${embeds.length}**`,
      embeds[currentPage]
    );

    try {
      await queueEmbed.react("⬅️");
      await queueEmbed.react("🗑");
      await queueEmbed.react("➡️");
    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    };

    const filter = (reaction, user) =>
      ["⬅️", "🗑", "➡️"].includes(reaction.emoji.name) &&
      message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, {
      time: 60000,
    });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "➡️") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(
              `> **__Page:__** **${currentPage + 1}** **__Of__** **${
                embeds.length
              }**`,
              embeds[currentPage]
            );
          };
        } else if (reaction.emoji.name === "⬅️") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(
              `> **__Page:__** **${currentPage + 1}** **__Of__** **${
                embeds.length
              }**`,
              embeds[currentPage]
            );
          };
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        };
        await reaction.users.remove(message.author.id);
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      };
    });

    function generateQueueEmbed(message, queue) {
      let embeds = [];
      let k = 5;

      for (let i = 0; i < queue.tracks.length; i += 5) {
        const current = queue.tracks.slice(i, k);
        let x = i;
        k += 5;
        const info = current
          .map((trackdata, x) => { return `**${++x}**. [\`${trackdata.title}\`](${trackdata.url})`})
          .join("\n");

        const serverQueue = client.player.getQueue(message);
        const embed = new MessageEmbed()
          .setAuthor("Queued songs")
          .setThumbnail(message.guild.iconURL())
          .setColor('BLACK')
          .setDescription(`${info}`)
          .addField(
            "Now Playing",
            `**[${serverQueue.playing.title}](${serverQueue.playing.url})**`,
            true
          )
          .addField("Volume", `**${serverQueue.volume}**`, true)
          .setTimestamp();

        if (serverQueue.tracks.length === 1)
          embed.setDescription(
            `No songs to play next add songs by \`\`${client.config.discord.prefix}play <song_name>\`\``
          );

        embeds.push(embed);
      };

      return embeds;
    };
  },
};