const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const embeds = require("../../embeds.js");
const itemsCollection = new Discord.Collection();
const path = require('path');


// Collect item files
const itemFiles = fs
  .readdirSync(path.join(__dirname, './items'))
  .filter((file) => file.endsWith(".js"));
for (const file of itemFiles) {
  const item = require(path.join(__dirname, `./items/${file}`));
  // Push new item to collection itemsCollection
  itemsCollection.set(item.name, item);
}
let storeItems = itemsCollection.array();

module.exports = {
  name: "buy",
  aliases: ["storebuy", "purchase"],
  description: "Buy an item from the store",
  cooldown: 7,
  category: "Economy",
  args: true,
  async execute(message, args, bot) {
    if (!args[0]) return message.channel.send(`${message.author}, please provide something to buy.`)
    let noCash = `Hey ${message.author}, you don't have enough money to buy that. Consider withdrawing some cash.`;
    let wallet = await db.get(`${message.author.id}_cash`);

    if (!itemsCollection.has(args[0]))
      return message.channel.send("That item is non-existent... Whoops!");
    const item = itemsCollection.get(args[0]);
    if (wallet < item.cost) return message.reply(noCash);
    await db.push(message.author.id, `${item.name}`);
    await db.add(`${message.author.id}_${item.name}`, item.amount);
    await db.subtract(`${message.author.id}_cash`, item.cost);
    message.reply(`You have successfully bought ${item.name} for ${item.cost}`);
    /*
    switch (args[0]) {
      case 'bandage':
        if(wallet < 30) return message.channel.send(noCash);
        db.push(message.author.id, 'bandage');
        db.add(`${message.author.id}_bandage`, 1);
        message.reply(bought);
        db.subtract(`${message.author.id}_cash`, 30)
        break;
      case 'medal':
        if(wallet < 2500) return message.channel.send(noCash);
        db.push(message.author.id, 'medal');
        db.add(`${message.author.id}_medal`, 1);
        break;
      default:
      message.channel.send('Hey, are you sure that item ACUTALLY exists?');

    }
    */
  },
};
