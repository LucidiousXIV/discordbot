//Define discord-js
const Discord = require('discord.js');

//Define moment
const moment = require("moment");

const bot = new Discord.Client();

module.exports.run = async (client, message, args) => {
    let user;
    // If the user mentions someone, display their stats. If they just run userinfo without mentions, it will show their own stats.
    if (message.mentions.isMentioned()) {
        user = message.mentions.isMentioned();
    } else {
        user = message.author;
    }
    // Define the member of a guild.
    const member = message.guild.member(user);

    let sicon = user.avatarURL;

    if (user.presence.status === "online") {
        let emote = client.emojis.find(`name`, "lbonline");
        const embed = new Discord.RichEmbed()
            .setColor(0x36393f)
            .setThumbnail(sicon)
            .addField("Full Username", `${user.username}#${user.discriminator}`, true)
            .addField("ID", `${user.id}`, true)
            .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
            .addField("Bot", `${user.bot ? '✅' : '⛔'}`, true)
            .addField("Status:", `${emote} Online`, true)
            .addField("Playing:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
            .addField("Roles:", member.roles.map(roles => `${roles}`).join(', '), true)
            .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`);
        message.channel.send(embed);
    } else if (user.presence.status === "idle") {
        let emote = client.emojis.find(`name`, "lbaway");
        const embed = new Discord.RichEmbed()
            .setColor(0x36393f)
            .setThumbnail(sicon)
            .addField("Full Username", `${user.username}#${user.discriminator}`, true)
            .addField("ID", `${user.id}`, true)
            .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
            .addField("Bot", `${user.bot ? '✅' : '⛔'}`, true)
            .addField("Status:", `${emote} Away`, true)
            .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
            .addField("Roles:", member.roles.map(roles => `${roles}`).join(', '), true)
            .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`);
        message.channel.send(embed);
    } else if (user.presence.status === "dnd") {
        let emote = client.emojis.find(`name`, "lbdnd")
        const embed = new Discord.RichEmbed()
            .setColor(0x36393f)
            .setThumbnail(sicon)
            .addField("Full Username", `${user.username}#${user.discriminator}`, true)
            .addField("ID", `${user.id}`, true)
            .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
            .addField("Bot", `${user.bot ? '✅' : '⛔'}`, true)
            .addField("Status:", `${emote} Do Not Disturb`, true)
            .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
            .addField("Roles:", member.roles.map(roles => `${roles}`).join(', '), true)
            .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`);
        message.channel.send(embed);
    } else {
        let emote = client.emojis.find(`name`, "lboffline")
        const embed = new Discord.RichEmbed()
            .setColor(0x36393f)
            .setThumbnail(sicon)
            .addField("Full Username", `${user.username}#${user.discriminator}`, true)
            .addField("ID", `${user.id}`, true)
            .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
            .addField("Bot", `${user.bot ? '✅' : '⛔'}`, true)
            .addField("Status:", `${emote} Offline`, true)
            .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
            .addField("Roles:", member.roles.map(roles => `${roles}`).join(', '), true)
            .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`);

        message.channel.send(embed);
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'userinfo',
    description: 'Displays a user\'s information.',
    usage: 'userinfo [@mention]'
};
