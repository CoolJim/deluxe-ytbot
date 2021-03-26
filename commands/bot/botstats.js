/** @format */

const Discord = require("discord.js");
const package = require("../../package.json");

module.exports = {
	name: "botstats",
	description: "General information about DeluxeBot",
	aliases: ["ver", "version", "robot", "botstatistics"],
    category: 'Bot',
    execute(message, args, bot) {
        const ver = new Discord.MessageEmbed()
        .setAuthor(`DeluxeBot Version ${package.version}`)
        .setTitle(`Bot statistics`)
        .setDescription(`Version: ${package.version}\nAuthor: ${package.author}`);
        message.channel.send(ver);
    } 
    
};
