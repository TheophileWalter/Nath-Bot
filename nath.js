const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');

client.login('YOUR_TOKEN');

client.on('ready', () => {
	client.user.setAvatar("./nath.png");
	console.log('Nathalie attend ses messages....');
});

client.on('message', message => {
	
	// Do not respond to our messages
	if (message.author.id === client.user.id) {
		return;
	}
	
	// Prepare the message
	var lower = message.content.toLowerCase();
	
	// Flag to bark
	var bark = true;
	
	// Response based on the message or the mention
	if (lower.indexOf('nath') !== -1 || (message.isMentioned(client.user) && lower == '')) {
		message.reply(getRandomMessage());
	} else if (lower.indexOf('nude') !== -1) {
		message.reply('', {
		    file: 'https://silvanosquad.ovh/app/nude.jpg'
		});
	} else {
		bark = false;
	}
	
	if (bark) {
		// Play the sound
		var voiceChannel = message.member.voiceChannel;
		if (voiceChannel !== undefined && voiceChannel !== null) {
			voiceChannel.join().then(connection =>{
				const dispatcher = connection.playFile('./bark.mp3');
				dispatcher.on("end", end => {
					voiceChannel.leave();
				});
			});
		}
	}
	
});

function getRandomMessage() {
	var content = fs.readFileSync('./nath/post' + Math.floor(Math.random()*1473) + '.txt').toString('utf8');
	console.log(content);
	return content;
}