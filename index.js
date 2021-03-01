// Dependencides
const Discord = require('discord.js');
const fs = require('fs');

// Intitialize
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
/* Commands - FS */
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		bot.commands.set(command.name, command);
	}
}
/* Add to array of commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}*/

// Private key
const key = require('./private/key.json');
const config = require('./config/config.json');

bot.once('ready', () => {
  console.log('Bot is up and running!');
});

bot.on('message', message => {
  if(!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
  	const command = bot.commands.get(commandName)
  		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  	if (!command) return;

 if (command.args && !args.length) {
   let reply = `You did not provide any arguments!`;
   if (command.usage) {
     reply += `\n The proper usage would be \`${config.prefix}${command.name} ${command.usage}\``;
     return message.channel.send(reply);
   }
 }
 if (command.admin && !message.author.hasPermission('ADMINISTRATOR')) {
   return message.channel.send(`Oi! You don't have ADMINISTRATOR permissions, and this command requires it.`);
 }

 if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;

if (timestamps.has(message.author.id)) {
  const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	}
}
timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    message.channel.send('Beep boop beep boop! Something happened and that command failed to execute. Contact Jim for more info or to pester him until he fixes it....\n**Error:** Command could not execute IDK why either');
  }

});

// Login
bot.login(key.token);
