const Discord = require('discord.js')
exports.run = (client, message, args, ops) => {

    const noperms = new Discord.RichEmbed()
            .setDescription('Sorry, only the bot owner can use this command!')
            .setColor('#de2e43')
    if (message.author.id !== ops.ownerID) return message.channel.send(noperms)
    
    if (args.length < 1) return message.channel.send({embed: {
            color: 0x36393f,
            description: "You must supply a Guild ID"
    }});
    client.guilds.get(args.join(" ")).leave()
        .then(g => message.channel.send({embed: {
            color: 0x36393f,
            description: `Successfully removed bot from ${g}`
        }}))
         .catch(console.error);
         
}
