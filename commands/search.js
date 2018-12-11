// Require package:
const Discord = require('discord.js')
const search = require('yt-search');

exports.run = (client, message, args, ops) => {
    
    // Search for videos based on the arguments
    search(args.join(' '), function(err, res) {
        // Error Handling
        if (err) return message.channel.send('Sorry, something went wrong.');
        
        // First, we only want to use the first ten results
        let videos = res.videos.slice(0, 10); // Can be changed to more or less
        const embed = new Discord.RichEmbed()
        .setDescription('You must enter a song/artist!')
        if (args.length < 1) return message.channel.send(embed)
        
        // Then, loop them to create an output string
        let resp = ''
        for (var i in videos) {
            resp += `**${parseInt(i)+1}:** ${videos[i].title}\n`;
        };
        
        resp += `\n**Choose a number between \`1-${videos.length}\`**`;
        
        // Send Output
        message.channel.send({ embed: { 
            color: 0x36393f,
            description: resp 
        }});
        
        // Then, we can create a message collector
        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
        // This is a filter, it will only accept text that is a number between the set range earlier
        const collector = message.channel.createMessageCollector(filter);
        
        // Update collector variables
        collector.videos = videos;
        
        // Create listener event
        collector.once('collect', function(m) {
            
            let commandFile = require(`./play.js`);
            commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops);
        })
        
    })
    
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
};
exports.help = {
    name: 'search',
    description: 'Searches for music to play from youtube.',
    usage: 'search <song name/artist name>'
};
