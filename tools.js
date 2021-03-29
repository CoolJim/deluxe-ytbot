/** @format */

// Imports
const chalk = require("chalk");
// Exports
module.exports = {
	errorReport(e) {
		console.log(chalk.bgRed.bold(`Caught error`));
		console.log(chalk.red(e));
	},
	rand(low, high) {
		return Math.floor(Math.random() * low) + high;
	},
	parseMention(client, mention) {
		const matches = mention.match(/^<@!?(\d+)>$/);
		if (!matches) return null;
		const id = matches[1];
		return client.users.cache.get(id);
	},
};
