/** @format */

module.exports = {
	name: "devSwag",
	description: "Some sick developer clothes. Welcome to the team my guy!",
	cost: Infinity,
	sell: 69420,
	collectable: true,
	restricted: true,
	execute(message, args, db) {
		return message.channel.send(`${message.author}, welcome to the devteam`);
	},
};
