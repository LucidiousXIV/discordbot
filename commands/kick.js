const Discord = require("discord.js");
exports.run = (client, message, args) => {
    
            const noperms = new Discord.RichEmbed()
            .setAuthor('Error: Insufficient Permissions')
            .setDescription('I do not have the correct permissions to run that command.\nNeeded permissions: \`KICK_MEMBERS \`')
            .setColor(0x36393f)
            const nopermsUser = new Discord.RichEmbed()
            .setAuthor('Error: Insufficient Permissions')
            .setDescription('You are unable to run that command.\nNeeded permissions: \`KICK_MEMBERS \`')
            .setColor(0x36393f)
            if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send(nopermsUser);
            if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.channel.send(noperms);
            
            let user = message.mentions.users.first();
            let reason = message.content.split(" ").slice(2).join(" ");
            let modlog = client.channels.find("name", "mod-log");

            if(!modlog) return message.reply("I've detected that this server doesn't have a mod-log channel.");
            if(message.mentions.users.size < 1) return message.reply("You must mention someone in order to kick them!");
            if(!reason) return message.reply("Enter a reason for kick.");
            if(!message.guild.member(user).kickable) return message.reply("Sorry, that person can't be kicked.");
            
            message.guild.member(user).kick(reason + 'You can rejoin by sending a dm to Lucidious#0001');
            
        const kickembed = new Discord.RichEmbed()
            .setAuthor(`${user.username} has been kicked from the server.`, user.displayAvatarURL)
            .addField("Kick information", ` **Kicked User :** ${user.tag}\n**Reason :** ${reason}`)
            .setFooter(`Staff: ${message.author.tag}`)
            .setTimestamp()
            .setColor(0x36393f);
            modlog.send({
            embed : kickembed
            });
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'kick',
    description: 'Kicks a member with a supplied reason.',
    usage: 'kick <@mention> <reason>'
};
