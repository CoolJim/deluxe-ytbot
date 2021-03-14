const db = require("quick.db");
const Discord = require("discord.js");
const fs = require("fs");
const embeds = require("../../embeds.js");
const path = require('path');
const itemsCollection = new Discord.Collection();

// Collect item files
const itemFiles = fs
  .readdirSync(path.join(__dirname, './items'))
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
  cooldown: 10,
  category: "Economy",
  disabled: true,
};
