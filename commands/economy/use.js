/** @format */

const db = require("quick.db");
const Discord = require("discord.js");
const fs = require("fs");
const embeds = require("../../embeds.js");
const path = require("path");
const itemsCollection = new Discord.Collection();

// Collect item files
const itemFiles = fs
	.readdirSync(path.join(__dirname, "./items"))
	.filter((file) => file.endsWith(".js"));
for (const file of itemFiles) {
	const item = require(path.join(__dirname, `./items/${file}`));
	// Push new item to collection itemsCollection
	itemsCollection.set(item.name, item);
}

module.exports = {
	name: "use",
	aliases: ["consume", "useit", "itemize"],
	description: "Use an item (if it can be used.)",
	args: true,
	cooldown: 5,
	category: "Economy",
	execute(message, args, bot) {
		// inventory.
		var inv = db.get(message.author.id);

		if (!args[0]) return message.reply("Ya gonna use something or no?");
		if (!itemsCollection.has(args[0]))
			return message.reply(
				"Hmm... item is non-existent. Like orangeman`s brain"
			);
		if (!inv.includes(args[0]))
			return message.reply(
				`Hey! Ya can't use something that you don't own... Its capitalism, whether ya like it ... or not`
			);
		let item = itemsCollection.get(args[0]);
		if (item.collect)
			return message.channel.send(
				`${message.author}, ${item.name} is a Collectable and cannot be used`
			);
		db.subtract(`${message.author.id}_${args[0]}`, 1);

		try {
			item.execute(message, args, db);
		} catch (e) {
			message.reply(`Hey ${message.author}, an error occured!\nError: ${e}`);
		}
	},
};
