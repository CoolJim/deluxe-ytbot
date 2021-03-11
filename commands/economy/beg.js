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
    console.log('Got somewhere');
    const user = message.author;
    let wallet = db.get(`${user.id}_cash`);
    console.log('Get wallet');
    let charisma = db.get(`${user.id}_charisma`);
    console.log('Got charisma');
    let chance = 100 - charisma;
    console.log('Got chance');
    let random = rands(0, chance);
    let money = rands(10, charisma);
    console.log('Randomised money');
    console.log('Past the let area');
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
    if (random == 1) {
      message.channel.send(successful);
      db.add(`${user.id}_cash`, money);
    } else {
      message.reply(`Whoops, they told you to go away!`);
    }
  },
};
