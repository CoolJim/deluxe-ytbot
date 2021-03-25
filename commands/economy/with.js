/** @format */

const db = require("quick.db");
const Discord = require("discord.js");
const balance = require("./bal.js");
const tools = require("../../tools.js");
const { toNamespacedPath } = require("path");

module.exports = {
  name: "withdraw",
  description: "Withdraw some cash from your bank",
  aliases: ["with", "take", "unbank", "wallet"],
  args: true,
  usage: "<amount>",
  category: 'Economy',
  execute(message, args, bot) {
    const user = message.author;
    const bank = db.get(`${user.id}_bank`);
    if (!args[0]) {
      return message.channel.send(
        `${user}, please specify the amount of money to withdraw!`
      );
    }
    if (isNaN(args[0]))
      return message.channel.send(
        `${user}, please specify an actual number, without the dollar sign`
      );
    if (bank < args[0])
      return message.channel.send(
        `${user}, you may not overdraw your account. Loans are being developed`
      );
    db.add(`${user.id}_cash`, args[0]);
    db.subtract(`${user.id}_bank`, args[0]);
    message.channel.send(`${user}, you withdrawed ${args[0]}. Your balance:`);
    try {
      balance.execute(message, bot, args);
    } catch (e) {
      tools.errorReport(e);
    }
  },
};
