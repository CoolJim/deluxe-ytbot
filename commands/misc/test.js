module.exports = {
  name: "test",
  description: "Test if the bot is responsive",
  admin: false,
  args: false,
  category: "Misc.",
  usage: "[blank]",
  cooldown: 2,
  execute(message) {
    message.channel.send(`${message.author}, the bot is working!`);
  },
};
