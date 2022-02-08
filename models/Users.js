const { Schema, model } = require("mongoose");

// Construct a new instance of the schema class
const UsersSchema = Schema({
	// Configure individual properties using Schema Types
	username: {
		type: String,
		required: true,
		maxlength: 280,
		unique: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please enter a valid email address",
		],
	},
	thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Thoughts",
		},
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: "Users",
		},
	],

	toJSON: {
		virtuals: true,
		getters: true,
	},
	id: false,
});

// Using mongoose.model() to compile a model based on the schema 'UsersSchema'
const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
