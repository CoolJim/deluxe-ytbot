/** @format */
const tools = require('../../../tools.js');

module.exports = {
	name: "grenade",
	description: "Blow your chums up with this ingenious invention! Note: does up to 25 damage, but not all the time",
	cost: 1200,
	sell: 500,
	collect: false,
	execute(message, args, db) {
		const client = message.client;
		function parseMention(mention) {
			// The id is the first and only match found by the RegEx.
			const matches = mention.match(/^<@!?(\d+)>$/);

			// If supplied variable was not a mention, matches will be null instead of an array.
			if (!matches) return;

			// However, the first element in the matches array will be the entire mention, not just the ID,
			// so use index 1.
			const id = matches[1];

			return client.users.cache.get(id);
		}
		const collector = message.channel.createMessageCollector(filter, {
			time: 15000,
		});
		const filter = message.channel
			.send(`${message.author}, who to bomb this time?`)
			.then(() => {
				collector.on("collect", (mention) => {
					var id = parseMention(mention);
					if (isNaN(id) || !id) {
						return message.channel.send(
							`${message.author}, user not valid. Try again`
						);
					}
					try {
                        db.subtract(`${id}_health`, tools.rand(0, 25));
					} catch {
                        db.add(`${message.author.id}_grenade`, 1);
                        message.channel.send(`${message.author}, I could not use that grenade! I refunded you a grenade.`)
                    }
				});
			});
	},
};
