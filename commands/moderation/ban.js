const tools = require("../../tools.js");
const discord = require("discord.js");

module.exports = {
  name: "ban",
  description: "Ban someone - Forever",
  permissions: "BAN_MEMBERS",
  args: "<banned-person> [reason]",
  category: "Moderation",
  guild: true,
  async execute(message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send("You can't use that!");
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.channel.send("I don't have the right permissions.");

    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!args[0]) return message.channel.send("Please specify a user");

    if (!member)
      return message.channel.send(
        "Can't seem to find this user. Sorry 'bout that :/"
      );
    if (!member.bannable)
      return message.channel.send(
        "This user can't be banned. It is either because they are a mod/admin, or their highest role is higher than mine"
      );

    if (member.id === message.author.id)
      return message.channel.send("Bruh, you can't ban yourself!");

    let reason = args.slice(1).join(" ");

    if (!reason) reason = "Unspecified";

    member.ban({ reason: reason }).catch((err) => {
      message.channel.send("Something went wrong");
      console.log(err);
    });

    const banembed = new Discord.MessageEmbed()
      .setTitle("Member Banned")
      .setThumbnail(member.user.displayAvatarURL())
      .addField("User Banned", member)
      .addField("Kicked by", message.author)
      .addField("Reason", reason)
      .setFooter("Time kicked", bot.user.displayAvatarURL())
      .setTimestamp();

    message.channel.send(banembed);
  },
};
