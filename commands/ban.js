const Discord = require("discord.js");
exports.run = (client, message, args) => {
    
            const noperms = new Discord.RichEmbed()
            .setDescription('I do not have the correct permissions to run that command.\nNeeded permissions: \`BAN_MEMBERS \`')
            .setColor(0x36393f)
            const nopermsUser = new Discord.RichEmbed()
            .setDescription('You are unable to run that command.\nNeeded permissions: \`BAN_MEMBERS \`')
            .setColor(0x36393f)
            const reasonBan = new Discord.RichEmbed()
            .setDescription('Please supply a reason for the ban.')
            .setColor(0x36393f)
            const cantBan = new Discord.RichEmbed()
            .setDescription('Sorry, I am unable to ban that user.')
            .setColor(0x36393f)
            if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send(nopermsUser);
            if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(noperms);
            
            let user = message.mentions.users.first();
            let reason = message.content.split(" ").slice(2).join(" ");
            let modlog = client.channels.find("name", "mod-log");

            if(!modlog) return message.reply("I've detected that this server doesn't have a mod-log channel.");
            if(message.mentions.users.size < 1) return message.reply("You must mention someone in order to kick them!");
            if(!reason) return message.reply(reasonBan);
            if(!message.guild.member(user).bannable) return message.reply(cantBan);
            let sicon = message.guild.iconURL;
            
            message.guild.member(user).ban(reason);
            
        const banembed = new Discord.RichEmbed()
            .setAuthor(`Banned | ${user.username}`, sicon)
            .setThumbnail(sicon)
            .addField("Ban information", ` **Banned User :** ${user.tag}\n**Reason :** ${reason}`)
            .addField('User', `${user.tag}`, true)
            .addField('Staff Member', `${message.author.tag}`, true)
            .addField('Reason', `${reason}`)
            .setTimestamp()
            .setColor(0x36393f);
            modlog.send({
            embed : banembed
            });
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'ban',
    description: 'Bans a member with a provided reason.',
    usage: 'ban <@mention> <reason>'
};
