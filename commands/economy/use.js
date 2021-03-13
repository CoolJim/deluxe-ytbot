const db = require("quick.db");
const Discord = require("discord.js");
const fs = require("fs");
const embeds = require("../../embeds.js");
const itemsCollection = new Discord.Collection();

// Collect item files
const itemFiles = fs
  .readdirSync("../../items/")
  .filter((file) => file.endsWith(".js"));
for (const file of itemFiles) {
  const item = require(`../../items/${file}`);
  // Push new item to collection itemsCollection
  itemsCollection.set(item.name, item);
}

module.exports = {
  name: "use",
  aliases: ["consume", "useit", "itemize"],
  description: "Use an item (if it can be used.)",
  args: true,
  cooldown: 10,
  category: "Economy",
  disabled: true,
};
