const fs = require("fs");

module.exports = {
  name: "reload",
  description:
    "Reload a command without having to restart the entire bot. Good for Jim",
  cooldown: 10,
  category: "Bot",
  args: true,
  usage: "<command>",
  execute(message, args, bot) {
    const commandName = args[0].toLowerCase();
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );
    const commandFolders = fs.readdirSync("./commands");
    const folderName = commandFolders.find((folder) =>
      fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`)
    );

    if (!command)
      return message.channel.send(
        `There is no command named \`${commandName}\`, ${message.author}!`
      );

    // yeetus deletus this command to Reload
    delete require.cache[
      require.resolve(`../${folderName}/${command.name}.js`)
    ];

    // catch to stop crashes and to prevent super-writes
    try {
      const newCommand = require(`../${folderName}/${command.name}.js`);
      message.client.commands.set(newCommand.name, newCommand);
      message.channel.send(`Command reloaded successfully`);
    } catch (error) {
      console.error(error);
      message.channel.send(
        `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``
      );
    }
  },
};
