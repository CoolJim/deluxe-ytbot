// Dependencides
const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");
const db = require("quick.db");
const random = require("random");
const embeds = require("./embeds.js");

// Intitialize
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
/* Commands - FS */
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
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
const key = require("./private/key.json");
const config = require("./config/config.json");

bot.once("ready", () => {
  console.log("Bot is up and running!");
  bot.user.setActivity("you", { type: "WATCHING" });
});

bot.on("message", (message) => {
  // Currency
  if (message.author.bot) return;
  db.add(`${message.author.id}_cash`, 1);
  if (random.int((min = 1), (max = 69420)) == 69) {
    message.channel.send(
      `Congratulations, ${message.author}! You have found a cash vault... containing 1000 dollars!`
    );
    db.add(`${message.author.id}_cash`, 1000);
  }
  // check if user is new
  if (db.get(`${message.author.id}_new`) == null) {
    // Get user for DM later
    let user = bot.users.cache.get(message.author.id);
    // Randomise charisma + defense
    let charisma = random.int((min = 1), (max = 99));
    // Maximum defense is 70 to enourage people to buy shields using IGC (in game currency)
    let defense = random.int((min = 1), (max = 70));
    // Make sure they cannot randomise charisma again (or defense)
    db.set(`${message.author.id}_new`, false);
    db.set(`${message.author.id}_charisma`, charisma);
    db.set(`${message.author.id}_defense`, defense);
    const joinNotice = new Discord.MessageEmbed()
      .setTitle(`Welcome to DeluxeBot RPG!`)
      .setColor("RANDOM")
      .setDescription(
        `Hi ${message.author.username}, welcome to the DeluxeBot RPG! Execute .help for more info. Here are your stats:\nCharisma: ${charisma}\nDefense: ${defense}.\nEnjoy your experience!`
      );
    try {
      user.send(joinNotice);
    } catch (e) {
      console.log(
        "Something happened, could not admit a user to the RPG! (send them the welcome)"
      );
      console.error(e);
    } finally {
      console.log(`New user ${message.author.username} has joined the RPG`);
    }
  }

  // Command
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    bot.commands.get(commandName) ||
    bot.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;
  if (command.guild && message.channel.type == "dm") {
    // COMBAK: Fill in the embed
    return message.channel.send(embeds);
  }

  if (command.args && !args.length) {
    let reply = `You did not provide any arguments!`;
    if (command.usage) {
      reply += `\n The proper usage would be \`${config.prefix}${command.name} ${command.usage}\``;
      return message.channel.send(reply);
    }
  }
  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply(
        "You can not do this, as you lack the sufficent perms."
      );
    }
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 2) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, bot);
  } catch (error) {
    message.channel.send(
      "Beep boop beep boop! Something happened and that command failed to execute. Contact Jim for more info or to pester him until he fixes it....\n**Error:** Command could not execute IDK why either"
    );
  }
});

// export
module.exports = {
  bot: bot,
};

// Login
bot.login(key.token);
