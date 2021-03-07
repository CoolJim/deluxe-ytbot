const db = require("quick.db");
const discord = require("discord.js");
module.exports = {
  name: "balance",
  aliases: ["bal", "wallet", "cash"],
  usage: "[mention]",
  description: "Check your wallet balance.",
  execute(message, bot, economy, args) {
    console.log("log`d");
    const user = message.author || message.mentions.users.first();
    if (!user)
      return message.reply(
        `Hey, you need to actually mention someone properly.`
      );
    let money = economy.get(`${user.id}_cash`);
    let bank = economy.get(`${user.id}_bank`);
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
