module.exports.run = async (client, message, args) => { // Run the command when a command is called

    var discord = require('discord.js');
    var db = require('quick.db')
    var send = require('quick.hook')
    
    let cmdList = [
        "cmd1",
        "cmd2",
        "cmd3"
    ] //replace below == cmdList if you want to base it off commands.

    if(!`${args[0]}` == String) return send(message.channel, `When sending a support ticket. Please Use This Type Of Example.\n**Usage**: \`-!support <command> <fault>\``, {
        name: `Support Error`,
        icon: `https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/server-512.png`
    })
    if(!message.member.hasPermission("SEND_MESSAGES")) return;
    
    let fault = args.slice(1, 1000, args[0]).join(' ');
    if (!fault == String) return send(message.channel, `The Fault You Provided Is Invalid. Please Use This Type Of Example.\n**Usage**: \`-!support <command> <fault>\``, {
        name: `Support Error`,
        icon: `https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/server-512.png`
    })

    const casenumbers = new db.table('CASE_NUMBER')
    const casenumber = await casenumbers.fetch(`SupportCases`)
    const a = casenumber
    const b = a + 1
    casenumbers.set(`SupportCases`, b)
    let supportEmbed = new discord.RichEmbed()
    .setTitle(`Support System || Ticket Created`)
    .setColor(0x36393f)
    .setDescription(`**Your Case Number**: ${casenumber}`)
    .addField(`**Your Case Problem**:`, `Command: ${args[0]}\nIssue: ${fault}`)
    .setFooter(`BOT System Support ||`)
    .setTimestamp()
    send(message.channel, supportEmbed, {
        name: `BOT Life Support`,
        icon: `https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/search-512.png`
    })

    const errorReport = client.channels.get("463970273696153600"); // PLEASE CHANGE - THIS IS TO ALERT YOUR CHOSEN SERVER TO RECIEVE THE ALERTS
    let supportDevEmbed = new discord.RichEmbed()
    .setTitle(`Support System || Ticket Created`)
    .setColor(0x36393f)
    .setDescription(`**Case Number**: ${casenumber}`)
    .addField(`**Case Problem**:`, `Command: ${args[0]}\nIssue: ${fault}`)
    .addField(`**Case Created By**:`, `${message.member}`)
    .setFooter(`BOT System Support`)
    .setTimestamp()
    send(errorReport, supportDevEmbed, {
        name: `BOT Life Support`,
        icon: `https://cdn1.iconfinder.com/data/icons/flat-business-icons/128/search-512.png`
    })


}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'case',
    description: 'Sends a case ticket regarding a command to the bot owner.',
    usage: 'case <command> <issue>'
};
