const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');


const snipe = new Discord.Collection();
const client = new Discord.Client();
client.commands = new Discord.Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}
client.once('ready', () => {
    const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}
 client.user.setPresence({ activity: { name: `${prefix}Help`, type: 'LISTENING' }, status: "idle"})

	console.log('Ready!');
});
client.on('message', message => {
	console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
});
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();

if (!client.commands.has(commandName)) return;

const command = client.commands.get(commandName);

try {
	command.execute(message, args);
} catch (error) {
	// ...
}

});


client.on("message", message => {
	if(message.content === "hi" || message.content === 'sup' || message.content === 'hello') {
	message.reply('Yo wassup')
	}
	client.on("messageDelete", message => {
		snipe.set(message.channel.id, {
		content: message.content,
		author: message.author,
	});	
	});
		if (message.content === "//snipe") {
		const msg = snipe.get(message.channel.id);
		if (!msg) return message.channel.send(" :Bruh: | Theres Nothing To Snipe");
		const embed = new Discord.MessageEmbed()
		.setTitle("Last Deleted Message")
		.setColor("RANDOM")
		.setTimestamp()
		.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
		.addFields(
		{ name: "Sender", value: msg.author.username },
		{ name: "Content", value: msg.content }
		);
		message.channel.send(embed);
		}
		
});






client.login("ODQ5NjAzMjE0MDcxNjkzMzk0.YLdkpw.YtDwdCb9A3kXvXZhK101UNLe6Bc");