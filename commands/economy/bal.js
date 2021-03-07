const db = require("quick.db");
const discord = require("discord.js");
const index = require('../../index.js')
module.exports = {
  name: "balance",
  aliases: ["bal", "wallet", "cash"],
  usage: "[mention]",
  description: "Check your wallet balance.",
  async execute(message, bot, args) {
    console.log("log`d");
    const user = message.mentions.users.first() || message.author;
    console.log('hiiiii');
    console.log('deth');
    let money = await index.economy.get(`${user.id}_cash`);
    console.log('ho chi min');
    let bank = await index.economy.get(`${user.id}_bank`);
    console.log('i c u p')
    if (!money || money == null) money = 0;
    if (!bank || bank == null) bank = 0;
    const balance = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${user}'s balance`)
      .setDescription(`Wallet: ${money}\nBank: ${bank}`)
      .setTimestamp();
    console.log("log2");
    message.channel.send(balance);
  },
};
