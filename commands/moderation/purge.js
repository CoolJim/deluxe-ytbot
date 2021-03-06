module.exports = {
  name: "purge",
  aliases: ["bulkdelete", "delete", "delte", "remove", "prune", "clear"],
  permissions: "MANAGE_CHANNELS",
  args: true,
  usage: '<messages>',
  description:
    "Prune up to 99 messages. Cannot delete messages over 2 weeks old.",
  execute(message, args, bot) {
    if (!args[0])
      return message.channel.send(
        `${message.author}, please specify how many messages to delete.`
      );
    var del = args[0];
    if (Number.isNaN(del) || !del > 0 || !del < 99)
      return message.channel.send(
        `${message.author}, specify a valid number <99`
      );
    message.channel.bulkDelete(del, true).catch((err) => {
      console.error(err);
      message.channel.send(
        `Could not prune messages, remember I cannot delete messages older than 2 weeks, and can only delete <99 messages.`
      );
    });
  },
};
