/** @format */

const db = require("quick.db");

const Discord = require("discord.js");
const embeds = require("../../embeds.js");

module.exports = {
	name: "upgrade",
	description: "Upgrade your RPG character",
	aliases: ["upg", "update", "up"],
	args: false,
	usage: "[shield|upgrades|me]",
	category: "RPG",
	execute(message, args, bot) {
		const upgradeLevel = db.fetch(`${message.author.id}_upgrades`) || 1;
		const wallet = db.fetch(`${message.author.id}_cash`);
		const shield = db.fetch(`${message.author.id}_shield`) || 0;
		const cost = 100000 * upgradeLevel;
		const upgradeList = new Discord.MessageEmbed()
			.setTitle("All upgrades possible:")
			.setDescription(`Your level: ${upgradeLevel}`)
			.addField(
				"Shield - $100,000 * (your level)",
				"This is like an extra healthbar, it basically protects you against threats by sacrificing itself.",
				true
			)
			.setColor("RANDOM")
			.setTimestamp();

		if (!args[0] || args[0] == "upgrades") {
			return message.channel.send(upgradeList);
		}
		if (args[0] == "me") {
			const profile = new Discord.MessageEmbed()
				.setAuthor(`${message.author.username} - ${message.author.id}`)
				.setTitle("Your Upgrades:")
				.setDescription(
					`Cost for next upgrade is $${
						upgradeLevel * 100000
					}\n**Upgrade Level:** ${upgradeLevel}`
				)
				.addField("Shield", `Shield: ${shield}`, true)
				.setTimestamp()
				.setColor("RANDOM");
			message.channel.send(profile);
		}

		if (args[0] == "shield") {
			if (wallet < cost) {
				return message.channel.send(
					`${message.author}, you do not have enough money to buy a shield.`
				);
			}
			db.subtract(`${message.author.id}_wallet`, cost);
			db.add(`${message.author.id}_shield`, 100);
			message.channel.send(
				`${
					message.author
				}, you sucessfully purchased a shield boost for ${cost}! Your shield is now ${db.get(
					`${message.author.id}_shield`
				)}`
			);
		}
	},
};
