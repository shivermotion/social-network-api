const connection = require("../config/connection");

// Global Variables
const log = console.log;

// Start the seeding runtime timer
console.time("Seeding SocialDB via MongoDB...");

// Models
const { Users, Thoughts } = require("../models");

connection.once("open", async () => {
	// Empty models
	await Users.deleteMany({}, (error, result) => {
		if (error) {
			log(error);
		}
	});
	await Thoughts.deleteMany({}, (error, result) => {
		if (error) {
			log(error);
		}
	});

	// Create users
	await Users.create({ username: "user", email: "user@user.com" });
	await Users.create({
		username: "newUser2",
		email: "newUser2@user.com",
	});
	await Users.create({
		username: "newUser3",
		email: "newUser3@user.com",
	});
	await Users.create({
		username: "newUser4",
		email: "newUser4@user.com",
	});

	let newUserThought = await Thoughts.create({
		username: "newUser",
		userThought: "bad me? no, BAD YOU",
	});
	await Users.findOneAndUpdate(
		{ username: "newUser" },
		{
			$push: { thoughts: newUserThought },
		}
	);

	let newUser2Thought = await Thoughts.create({
		username: "newUser2",
		userThought: "badabbabbabaaaaaim lovin snacks",
	});
	await Users.findOneAndUpdate(
		{ username: "newUser2" },
		{
			$push: { thoughts: newUser2Thought },
		}
	);

	console.timeEnd("Seeding successfully completed!");
	process.exit(0);
});
