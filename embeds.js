const Discord = require("discord.js");

// Styles
const error = `An error was encountered executing that command`;
const errorImg = "https://discord.com/channels/734674763435343872/734674763812700231/819111482830094336";
const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const guildOnly = new Discord.MessageEmbed()
  .setTitle(error)
  .setDescription(
    `This command can only be executed within a server, and cannot be executed directly!`
  )
  .setImage(errorImg)
  .setURL(link)
  .setTimestamp()
  .setColor("RANDOM")
  .setFooter("Never gonna give you up, never gonna let you down, never...");

// Exports
module.exports = guildOnly;
