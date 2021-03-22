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
    let userItems = db.get(`${user.id}`);
    let items = ["bandage", "medal"];
    let data = [];
    items.forEach((element) => {
      if (userItems.includes(element)) {
        data.push(element + ' ' + db.get(`${user.id}_${element}`) + "\n");
      }
    });
    const inv = new Discord.MessageEmbed()
      .setAuthor(user.username)
      .setTitle("Inventory")
      .setDescription(data)
      .setTimestamp();
    message.channel.send(inv);
  },
};
