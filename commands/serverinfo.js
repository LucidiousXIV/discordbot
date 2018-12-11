const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
  const lbonline = client.emojis.get("464635704865980416")
  const lbaway = client.emojis.get("464635770204979201")
  const lbdnd = client.emojis.get("464635806225661963")
  const lboffline = client.emojis.get("464635840996573196")
  const whitex = client.emojis.get("464666498728722442")

  let sicon = message.guild.iconURL;
  const roles = message.guild.roles.map
  const serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Server Owner: ${message.guild.owner.user}`)
   .setColor(0x36393f)
   .setThumbnail(sicon)
   .addField('Member Status', `${lbonline} -  **${message.guild.members.filter(o => o.presence.status === 'online').size}** Online \n${lbaway} -  **${message.guild.members.filter(o => o.presence.status === 'away').size}** Away \n${lbdnd} -  **${message.guild.members.filter(o => o.presence.status === 'dnd').size}** DND \n${lboffline} -  **${message.guild.members.filter(o => o.presence.status === 'offline').size}** Offline`, true)
   .addField('Members', `**${message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size}** - Humans\n**${message.guild.members.filter(m => m.user.bot).size}** - Bots`, true)
   .addField('Channels', `${message.guild.channels.size}`, true)
   .addField('Verification level', message.guild.verificationLevel, true)
   .addField("Roles", message.guild.roles.map(roles => `${roles}`).join(', '), true)
   .setTimestamp()
   
   message.channel.send(serverembed);

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'serverinfo',
    description: 'Displays the server\'s information.',
    usage: 'serverinfo'
};


/*

  let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Server Created • ${day}.${month}.${year}`)
   .setColor("#7289DA")
   .setThumbnail(sicon)
   .addField("ID", message.guild.id, true)
   .addField("Name", message.guild.name, true)
   .addField("Owner", message.guild.owner.user.tag, true)
   .addField("Channels", message.guild.channels.size, true)
   .addField("Members", message.guild.members.filter(o => o.presence.status === 'online').size, true)
   .addField("<:aONLINE:457031755212521484>", message.guild.members.filter(o => o.presence.status === 'online').size)
   .addField("Humans", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Bots", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Roles", message.guild.roles.map(roles => `${roles.name}`).join(', '), true);
   message.channel.send(serverembed);
  
*/
