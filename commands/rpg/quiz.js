/** @format */
const quiz = require("./quiz.json");
const Discord = require("discord.js");
module.exports = {
	name: "quiz",
	description:
		"Take a quiz, solo or with friends! First one to get the right answer gets $10 (in game cash). 10 seconds to get an answer!",
	aliases: ["quizlet", "quizz", "fastquiz", "questions", "qaa", "q&a", "qna"],
	category: "RPG",
	execute(message, args, bot) {
		const filter = (response) => {
			return item.answers.some(
				(answer) => answer.toLowerCase() === response.content.toLowerCase()
			);
		};
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        message.channel.send(item.question).then(() => {
					message.channel
						.awaitMessages(filter, { max: 1, time: 10000, errors: ["time"] })
						.then((collected) => {
							message.channel.send(
								`👍 ${collected.first().author} got the correct answer! `
							);
						})
						.catch((collected) => {
							message.channel.send(
								"👎 Looks like nobody got the answer this time."
							);
						});
				});
	},
};
