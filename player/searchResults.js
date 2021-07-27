module.exports = (message, query, tracks) => {
    message.channel.send({
        embed: {
            color: 'BLACK',
            author: { name: `Search results ${query}` },
            footer: { text: 'Made by Sherry' },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `\`${i + 1}\` - ${t.title}`).join('\n')}`,
        },
    });
};