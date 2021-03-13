const Discord = require('discord.js');
const db = require('quick.db');
const embeds = require('../../embeds.js');

module.exports = {
  name: 'buy',
  aliases: ['storebuy', 'purchase'],
  description: 'Buy an item from the store',
  cooldown: 20,
  category: 'Economy',
  args: true,
  async execute(message, args, bot) {
    let noCash = `Hey ${message.author}, you don't have enough money to buy that. Consider withdrawing some cash.`;
    let bought = `Successfully bought!`
    let wallet = await db.get(`${message.author.id}_cash`);
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

  }
}
