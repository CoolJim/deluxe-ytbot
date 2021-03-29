/** @format */

module.exports = {
	name: "bandage",
	description: "Heals 15 health when used, up to 100 health",
	cost: 30,
	sell: 15,
	amount: 1,
	execute(message, args, db) {
		let health = db.get(`${message.author.id}_health`);
		if ((health = 100))
			return message.channel.send(
				`${message.author}, no need to heal, you are already all healed up!`
			);
		if (health + 15 >= 100) {
			let heal = 100 - health;
			db.add(`${message.author.id}_health`, heal);
			return message.channel.send(
				`${message.author}, we only healed ${heal} health, as you were less than 15 health away from 100%`
			);
		} else {
			heal = 15;
			db.add(`${message.author.id}_health`, heal);
			return message.channel.send(
				`${message.author}, we healed 15 health. Your health now is ${
					health + 15
				}`
			);
		}
	},
};
