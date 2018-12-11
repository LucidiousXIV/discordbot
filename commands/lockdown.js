const Discord = require('discord.js')
const ms = require('ms');

const lifted = new Discord.RichEmbed()
        .setColor(0x36393f)
        .setDescription('Lockdown lifted.')
                                
exports.run = (client, message, args, tools) => {
if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Sorry, you don\'t have permission to lockdown or unlock!')
    .then(msg => msg.delete({
        timeout: 10000
    }));
if (!client.lockit) client.lockit = [];
let time = args.join(' ');
let validUnlocks = ['release', 'unlock'];
if (!time) return message.channel.send('You must set a duration for the lockdown in either hour(s), minute(s) or second(s)');

if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
        })
        .then(() => {
            message.channel.send(lifted);
            clearTimeout(client.lockit[message.channel.id]);
            delete client.lockit[message.channel.id];
        })
        .catch(error => {
            console.log(error);
        });
} else {
    message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        })
        .then(() => {
            const lockdown = new Discord.RichEmbed()
                .setColor(0x36393f)
                .setDescription(`Channel locked down for ${ms(ms(time), { long:true })}`)
            message.channel.send(lockdown)
                .then(() => {

                    client.lockit[message.channel.id] = setTimeout(() => {
                        message.channel.overwritePermissions(message.guild.id, {
                                SEND_MESSAGES: null
                            })
                            .then(message.channel.send(lifted))
                            .catch(console.error);
                        delete client.lockit[message.channel.id];
                    }, ms(time));
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'lockdown',
    description: 'Locks down a channel, preventing text of those without administrator, for a certain amount of time.',
    usage: 'lockdown <time> s:m:h'
};
