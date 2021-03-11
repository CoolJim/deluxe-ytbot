const db = require("quick.db");
const Discord = require("discord.js");
const random = require("random");

function rands(min, max) {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

module.exports = {
  name: "beg",
  description: "Short of money? See if begging will work...",
  aliases: ["begging", "beggd"],
  execute(message, args, bot) {

    const user = message.author;
    let wallet = db.get(`${user.id}_cash`);

    let charisma = db.get(`${user.id}_charisma`);

    let chance = 100 - charisma;

    let random = rands(0, chance);
    let money = rands(10, charisma);

    const successful = new Discord.MessageEmbed()
      .setAuthor("A kind stranger")
      .setDescription("A random stranger has given you " + money + " dollars!")
      .setColor("RANDOM");

    if (wallet >= 6000) {
      return message.channel.send(
        `Yo ${user}, you're wayyyy too rich to be a poor beggar! Leave that to some poor dude.`
      );
    }
    console.log("It should work");
    if (random == 1 || random == 2 || random == 3) {
      message.channel.send(successful);
      db.add(`${user.id}_cash`, money);
    } else {
      message.reply(`Whoops, they told you to go away!`);
    }
  },
};
