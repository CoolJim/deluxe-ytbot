const Discord = require("discord.js");
const db = require("quick.db");
const embeds = require("../../embeds.js");

module.exports = {
  name: "inventory",
  aliases: ["inv", "inventories"],
  description: "Check your inventory",
  args: false,
  cooldown: 5,
  category: "Economy",
  async execute(message, args, bot) {
    let user = message.author;
    let items = db.get(user.id) || `${user.username} has no items`;

    const inv = new Discord.MessageEmbed()
      .setTitle(`${user.username}'s items'`)
      .setColor("RANDOM")
      .addField("Inventory", items);
    message.channel.send(inv);
  },
};
