const tools = require("../../tools.js");
const discord = require("discord.js");
const index = require("../../index.js");
module.exports = {
  name: "kick",
  description:
    "Give your enemies the boot. They are idiots. No idiot, no problem... No man no problem - Stalin the weirdo",
  permissions: "KICK_MEMBERS",
  args: "<offender>",
  category: "Moderation",
  guild: true,
  async execute(message, args, bot) {
    if (!message.guild.me.hasPermission("KICK_MEMBERS"))
      return message.channel.send("You gotta give me perms to kick!");

    const offender =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!args[0])
      return message.channel.send("You have to mention someone to kick them");
    if (!offender) return message.channel.send("Cannot find offender");
    if (!offender.kickable)
      return message.channel.send(
        "Cannnot kick them, whoops! (Perhaps I don't have perms, or are below them)"
      );
    if (offender.id == message.author.id)
      return message.channel.send(`Can't kick yourself`);
    let reason = args.slice(1).join(" ");
    if (!reason) reason = `Unspecified, banned by ${message.author}`;
    try {
      offender.kick({ reason: reason });
    } catch (error) {
      message.channel.send(
        `Hey, ${message.author}. We failed to kick ${offender}, We don't know why.`
      );
    }
  },
};
