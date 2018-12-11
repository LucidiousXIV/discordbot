const Discord = require("discord.js");
const ytdl = require('ytdl-core');


exports.run = async (client, message, args, ops) => {
    
    const embed = new Discord.RichEmbed()
    .setAuthor(':no_entry: Please enter a voice channel')
    .setDescription('You must be in a voice channel to play music!')
    .setColor(0x36393f)
    if (!message.member.voiceChannel) return message.channel.send({embed});
    
    if (!args[0]) return message.channel.send('Sorry, please input a url following the command.');
    
    let validate = await ytdl.validateURL(args[0]);
    
    if (!validate) return message.channel.send('Sorry, please input a **valid** url following the command.')
    
    let info = await ytdl.getInfo(args[0])
    
    let data = ops.active.get(message.guild.id) || {};
    
    if (!data.connection) data.connection = await message.member.voiceChannel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });
    if (!data.dispatcher) play(client, ops, data);
    else {
        const addQueue = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':white_check_mark: Song Added!')
        .setDescription(`**Added to Queue:** ${info.title}\n**Requested By:** ${message.author.tag}`)
        
        message.channel.send(addQueue)
        
    }
    
    ops.active.set(message.guild.id, data);
}

async function play(client, ops, data) {
    
    const playingNow = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setTitle(':musical_note: Now Playing')
        .setDescription(`**Now Playing:** ${data.queue[0].songTitle}\n**Requested By:** ${data.queue[0].requester}`)
    
    client.channels.get(data.queue[0].announceChannel).send(playingNow);
    
    data.dispatcher = await  data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }));
    data.dispatcher.guildID = data.guildID;
    
    data.dispatcher.once('end', function() {
        finish(client, ops, this);
    });
    
}

function finish(client, ops, dispatcher) {
    
    let fetched = ops.active.get(dispatcher.guildID);
    
    fetched.queue.shift();
    
    if (fetched.queue.length > 0) {
        
        ops.active.set(dispatcher.guildID, fetched);
        
        play(client, ops, fetched);
        
    } else {
        
        ops.active.delete(dispatcher.guildID);
        
        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel
        if (vc) vc.leave();
    }
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'play',
    description: 'Plays music from a youtube link.',
    usage: 'play <link>'
};

/*
    var playing = new Discord.RichEmbed()
    .setAuthor('Now playing')
    .setDescription(`${info.title}`)
    .setColor('#2ecc71')
    
    message.channel.send(playing);
    console.log(`${info.title}`)
*/
