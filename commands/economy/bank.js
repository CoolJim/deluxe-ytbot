const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const embeds = require("../../embeds.js");
const itemsCollection = new Discord.Collection();
const path = require("path");
const bal = require('./bal.js');

module.exports = {
  name: "bank",
  description: "Deposit some of those NOICE cash",
  aliases: ["dep", "deposit"],
  args: true,
  usage: "<amount>",
  category: "Economy",
  cooldown: 3,
  execute(message, args, bot) {
    const wallet = db.get(`${message.author.id}_cash`);
    const bank = db.get(`${message.author.id}_bank`);
    if (isNaN(args[0]))
      return message.channel.send(
        `Hey ${message.author}, specify how much money to deposit. No dollar sign needed`
      );
    if (args[0] > wallet)
          return message.channel.send(`${message.author}, not enough money!`);
      db.subtract(`${message.author.id}_cash`, args[0]);
      db.add(`${message.author.id}_bank`, args[0]);
      message.channel.send(`${message.author}, you deposited ${args[0]}. Here is your balance now:`);
      bal.execute(message, args, bot);
  },
};
