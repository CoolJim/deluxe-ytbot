const Discord = require("discord.js");
const db = require("quick.db");
const embeds = require("../../embeds.js");
const fs = require('fs')
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
let storeItems = itemsCollection.array();

module.exports = {
  name: "inventory",
  aliases: ["inv", "inventories"],
  description: "Check your inventory",
  args: false,
  cooldown: 5,
  category: "Economy",
  async execute(message, args, bot) {
    let user = message.author;
    let data = [];
    storeItems.forEach((element) => {
      let item = itemsCollection.get(element.name);
      data.push(`${item.name}: ${db.get(`${user.id}_${item.name}`) || 0}`)
    });
    const inv = new Discord.MessageEmbed()
      .setAuthor(user.username)
      .setTitle("Inventory")
      .setDescription(data, { split: true })
      .setTimestamp();
    message.channel.send(inv);
  },
};
