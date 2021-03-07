module.exports = {
  name: "purge",
  aliases: ["bulkdelete", "delete", "delte", "remove", "prune", "clear"],
  permissions: "MANAGE_CHANNELS",
  args: true,
  usage: "<messages>",
  description:
    "Prune up to 99 messages. Cannot delete messages over 2 weeks old.",
  execute(message, args, bot) {
    if (!args[0])
      return message.channel.send(
        `${message.author}, please specify how many messages to delete.`
      );
    const del = parseInt(args[0]);
    if (isNaN(del))
      return message.channel.send(`${message.author}, specify a valid number`);
    if (del < 2 || del > 100)
      return message.channel.send(
        `Number needs to be <100 and >1 (number can be 2-99, including 2 & 99)`
      );
    message.channel.bulkDelete(del, true).catch((err) => {
      console.error(err);
      message.channel.send(
        `Could not prune messages, remember I cannot delete messages older than 2 weeks, and can only delete up to 99 messages.`
      );
    });
  },
};
