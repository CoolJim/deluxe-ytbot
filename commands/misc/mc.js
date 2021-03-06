const request = require("request");

function getStatus(url) {
  return new Promise((resolve, reject) => {
    request(url, function (err, response, body) {
      var status;
      if (err) {
        console.log(err);
        reject(new Error("API error"));
      } else {
        body = JSON.parse(body);
        if (body.online) {
          status = (body.players.now || "0") + " of " + body.players.max;
        } else {
          status = "Offline";
        }
        resolve(status);
      }
    });
  });
}

module.exports = {
  name: "mcstats",
  category: "Misc",
  description: "Check stats of Minecraft servers",
  usage: "<IP> [PORT]",
  cooldown: 20,
  async execute(message, args, bot, discord, request) {
    if (!args[0]) return message.channel.send("Specify an IP");
    var IP = args[0];
    var port = args[1] || 25565;
    var url = "http://mcapi.us/server/status?ip=" + IP + "&port=" + port;
    message.channel.send('Waiting for a response...');
    message.channel.send('Pinging ' + IP + ' at port ' + port);
    var status = await getStatus(url);
    if (status == "Offline") {
      status = "Server is OFFLINE.";
    } else {
      status = "Player count: " + status;
    }
    message.channel.send(status);
  },
};
