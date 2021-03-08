const db = require("quick.db");
const Discord = require("discord.js");
const random = require("random");

module.exports = {
  name: "beg",
  description: "Short of money? See if begging will work...",
  aliases: ["begging", "beggd"],
  execute(message, args, bot) {
    const user = message.author;
    let wallet = db.get(`${user.id}_cash`);
    let charisma = db.get(`${user.id}_charisma`);
    let chance = 100 - charisma;
    let random = random.int((min = 0), (max = chance));
    let money = random.int((min = 10), (max = charisma));
    const successful = new Discord.MessageEmbed()
      .setAuthor("A kind stranger")
      .setDescription("A random stranger has given you " + money + " dollars!")
      .setColor("RANDOM");

    if (wallet >= 6000) {
      return message.reply(
        `Yo ${user}, you're wayyyy too rich to be a poor beggar! Leave that to some poor dude.`
      );
    }
    if (chance == 1) {
      message.reply(successful);
    }
    else {
      message.reply(`Whoops, they told you to go away!`);
    }
  },
};
