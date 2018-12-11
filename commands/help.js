const Discord = require('discord.js'); // Required to use Rich Embeds


exports.run = (client, message, args, tools) => {
    
const help = new Discord.RichEmbed()

  /*  .setTitle(':information_source: Help / Commands - <> Required, [] Optional')
    .setColor(0xf1c40f)
    .setDescription('**Moderation**, **Music**, **Fun**, **Utilities**')
    .addField('Kick','Kicks a member from the server. **Usage:** >!kick <@Mention> <reason>')
    .addField('Lockdown','Locksdown a channel. **Usage**: >!lockdown <time><s/m/h>')
    .addField('Purge','Deletes up to 100 messages at once. **Usage** >!purge <1-100>')
    .addField('Poll','Creates a reaction based poll vote. **Usage** >!poll <question>')
    .addField('Play','Plays a song from youtube. **Usage** >!play <link>')
    .addField('Search','Searches for videos on youtube. **Usage** >!search <video name>')
    .addField('Leave','Makes the client leave the channel. (client commander role only!). **Usage** >!leave')
    .addField('Queue','Shows the current queue lineup. **Usage** >!queue')
    .addField('Pause','Pauses the current music. **Usage** >!pause')
    .addField('Resume','Resumes the current music. **Usage** >!resume')
    .addField('Skip','Initiates a vote skip by people in channel. **Usage** >!skip')
    .addField('ASCII','Sends text in ASCII format. **Usage** >!ascii <text>')
    .addField('Case','Sends a message to the client owner for issues. **Usage** >!case <issue>')
    .addField('Help','Shows this message. **Usage** >!help')
    .addField('Ping','Shows your connection to the client and server. **Usage** >!ping')*/
    
    .setTitle(':information_source: Help / Commands - <> Required, [] Optional - >!')
    .setDescription('Help Menu')
    .setColor(0x36393f)
    .addField('Moderation', '\`Ban, Kick, Lockdown, Mute\`')
    .addField('Music', '\`Leave, Pause, Play, Queue, Resume, Search, Skip\`')
    .addField('Fun', '\`Ascii, Poll\`')
    .addField('Utilities', '\`Case <command name> <issue>,Help, Ping, ServerInfo, Ticket <issue>, UserInfo [mention], Weather <location>\`')
    
message.channel.send(help)
    
};

