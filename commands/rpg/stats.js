const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "stats",
  aliases: ["styat", "stat", "mystats", "mystat"],
  description: "Check you stats (charisma, etc)",
  category: "RPG",
  usage: "[mention]",
  cooldown: 30,
  async execute(message, args) {
    const user = message.mentions.members.first() || message.author;
    let charisma = await db.get(`${user.id}_charisma`);
    let defense = await db.get(`${user.id}_defense`);
    let health = await db.get(`${user.id}_health`);
    if (health == null) db.set(`${user.id}_health`, 100);
    // Get health again after reset
    health = await db.get(`${user.id}_health`);
    const stats = new Discord.MessageEmbed()
      .setAuthor(`Stats for ${user.username}`)
      .setTitle(`Statistics`)
      .setDescription(
        `Charisma: ${charisma}/99\nDefense: ${defense}/100\nHealth: ${health}`
      )
      .addFields(
        {
          name: "Charisma",
          value:
            "Charisma is a measure of you character's charm. The more you have, the more likely you'll be able to beg, convince others, etc",
          inline: true,
        },
        {
          name: "Defense",
          value:
            "Defense is how likely (out of 100%) you will be able to defend against an attack (ie someone robbing you, pets attacking etc)",
          inline: true,
        },
        {
          name: "Health",
          value:
            "You start with 100 health, (the Maximum), and can be damaged by attacks. You can heal too, with items",
          inline: true,
        }
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/734674763812700233/819495896307728394/icons8-statistics-64.png"
      );
    message.channel.send(stats);
  },
};
