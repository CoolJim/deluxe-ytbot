/** @format */

const Discord = require("discord.js");

// Styles
const error = `An error was encountered executing that command`;
const errorImg =
	"https://cdn.discordapp.com/attachments/734674763812700231/819111482704789534/error.png";
const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const guildOnly = new Discord.MessageEmbed()
	.setAuthor("guildOnly TYPE command")
	.setTitle(error)
	.setDescription(
		`This command can only be executed within a server, and cannot be executed directly!`
	)
	.setImage(errorImg)
	.setURL(link)
	.setTimestamp()
	.setColor("RANDOM")
	.setFooter("Never gonna give you up, never gonna let you down, never...");

const miscError = new Discord.MessageEmbed()
	.setAuthor("tryCatch MISC error TYPE error")
	.setTitle(error)
	.setDescription(
		`Whoops! This command failed to execute. We don't know why though, maybe try pestering Jim until he fixes it??`
	)
	.setImage(errorImg)
	.setURL("https://discordjs.org")
	.setColor("RANDOM")
	.setFooter("No please actually don't spam me!");

const inventoryEmpty = new Discord.MessageEmbed()
	.setTitle("You do not own any items")
	.setDescription("Better buy some...")
	.setColor("RANDOM");
const upgradeList = new Discord.MessageEmbed()
	.setTitle("All upgrades possible:")
	.addField(
		"Shield",
		"This is like an extra healthbar, it basically protects you against threats by sacrificing itself.",
		true
	)
	.setColor("RANDOM")
	.setTimestamp();
// Exports
module.exports = { guildOnly, miscError, inventoryEmpty, upgradeList };
