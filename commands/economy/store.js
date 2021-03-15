const db = require("quick.db");
const Discord = require("discord.js");
const fs = require("fs");
const embeds = require("../../embeds.js");
const path = require('path');
const itemsCollection = new Discord.Collection();

// Collect item files
const itemFiles = fs
  .readdirSync(path.join(__dirname, './items'))
  .filter((file) => file.endsWith(".js"));
for (const file of itemFiles) {
  const item = require(path.join(__dirname, `./items/${file}`));
  // Push new item to collection itemsCollection
  itemsCollection.set(item.name, item);
}

module.exports = {
  name: 'store',
  description: 'See what items are up for sale',
  category: 'Economy',
  aliases: ['shop'],
  usage: '[item name]',
  execute(message, args, bot) {
    if(!args.length) {
    let data = [];
    data.push(`${message.author}, there are all the items up for offer on the store:`);
    data.push(itemsCollection.map((item) => item.name).join(`\n`));
    data.push('Type `.store item-name` to see items individually');
    return message.channel.send(data, { split: true });
  }

  const name = args[0].toLowerCase();
  const item =
  itemsCollection.get(name) ||
  itemsCollection.find((i) => i.aliases && i.aliases.includes(name));
  if (!item) return message.channel.send(`${message.author}, try actually choosing an item this time...`);

  const itemInformation = new Discord.MessageEmbed()
    .setAuthor('DeluxeEconomy Store')
    .setTitle(`${item.name}`)
    .setDescription(`${item.description || 'No description'}
    \n**Price:** ${item.cost}\n**Sell Price:** ${item.sell}\n**On Sale?** ${item.onSale || 'No'}`)
    .setTimestamp()
    .setFooter(`On sale sometime in the future`);
  message.channel.send(itemInformation);


  }
}
