const db = require("quick.db");
const Discord = require("discord.js");
const random = require("random");

module.exports = {
  name: "balance",
  aliases: ["bal", "wallet", "cash"],
  usage: "[mention]",
  category: 'Economy',
  description: "Check your wallet + bank balance.",
  execute(message, args, bot) {
    const user = message.mentions.users.first() || message.author;

    let money = db.get(`${user.id}_cash`);

    let bank = db.get(`${user.id}_bank`);

    if (!money || money == null) money = 0;
    if (!bank || bank == null) bank = 0;
    const balance = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${user.username}'s balance`)
      .setDescription(`Wallet: ${money}\nBank: ${bank}`)
      .setTimestamp();
    message.channel.send(balance);
  },
};
