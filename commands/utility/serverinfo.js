const Discord = require('discord.js');


module.exports = {
	name: 'serverinfo',
	description: 'sends the serverinfo of the user!',
	execute(message, args) {
let embed = new Discord.MessageEmbed()
.setAuthor(`Info for ${message.guild}`, message.guild.iconURL({ dynamic: true }))
.setColor("YELLOW")
.setTitle("Server Info")
.setImage(message.guild.iconURL)
.setDescription(`${message.guild}'s Information.`)
.addField("Owner", `${message.guild.owner}`, true)
.addField("Member Count", `This server has ${message.guild.memberCount} member(s).`)
.addField("Emoji Count", `This server has ${message.guild.emojis.cache.size} emoji(s).`)
.addField("Roles Count", `This server has ${message.guild.roles.cache.size} role(s).`)
.setFooter(`ID: ${message.guild.id}, Created • ${message.guild.createdAt.toDateString()}`)
 message.channel.send(embed)
}
}
