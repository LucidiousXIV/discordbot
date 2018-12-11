const Discord = require('discord.js')

exports.run = async (client, message, args, ops) => {

    const nonePlaying = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':no_entry: No Music Playing')
        .setDescription('There currently isn\'t any music playing in this guild!')

    let fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send(nonePlaying)

    const noChannel = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':no_entry: Wrong Channel')
        .setDescription('You must be in the same channel as the bot to skip a song.')

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(noChannel)

    let userCount = message.member.voiceChannel.members.size;

    let required = Math.ceil(userCount / 2);

    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    const alreadyVoted = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':no_entry: Already Voted')
        .setDescription(`Sorry, you already voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`)

    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(alreadyVoted)

    fetched.queue[0].voteSkips.push(message.member.id);

    ops.active.set(message.guild.id, fetched);

    if (fetched.queue[0].voteSkips.length >= required) {

        const successfulSkip = new Discord.RichEmbed()
            .setColor(0x36393f)
            .setTitle(':white_check_mark: Song Skipped')
            .setDescription('Song was successfully skipped!')

        message.channel.send(successfulSkip)

        return fetched.dispatcher.emit('end');

    }
    const successfulVote = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':white_check_mark: Vote Successful')
        .setDescription(`Successfully voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`)
    message.channel.send(successfulVote)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'skip',
    description: 'Makes a vote to skip the current song.',
    usage: 'skip'
};
