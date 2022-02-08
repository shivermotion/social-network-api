const { Users } = require("../models");

module.exports = {
	// Get all Users
	getUsers(req, res) {
		Users.find()
			.then((users) => res.json(users))
			.catch((err) => res.status(500).json(err));
	},
	// Get a user
	getSingleUser(req, res) {
		Users.findOne({ _id: req.params.usersId })
			.select("-__v")
			.then((users) =>
				!users
					? res.status(404).json({
							message: "No users with that ID",
					  })
					: res.json(users)
			)
			.catch((err) => res.status(500).json(err));
	},
	// Create a user
	createUser(req, res) {
		Users.create(req.body)
			.then((users) => res.json(users))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Delete a user
	deleteUser(req, res) {
		Users.findOneAndDelete({ _id: req.params.usersId })
			.then((users) =>
				!users
					? res.status(404).json({
							message: "No users with that ID",
					  })
					: Student.deleteMany({
							_id: {
								$in: users.students,
							},
					  })
			)
			.then(() =>
				res.json({
					message: "users and students deleted!",
				})
			)
			.catch((err) => res.status(500).json(err));
	},
	// Update a user
	updateUser(req, res) {
		users.findOneAndUpdate(
			{ _id: req.params.usersId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((users) =>
				!users
					? res.status(404).json({
							message: "No users with this id!",
					  })
					: res.json(users)
			)
			.catch((err) => res.status(500).json(err));
	},
};
