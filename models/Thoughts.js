const { Schema, model, Types } = require("mongoose");
const ReactionSchema = require("./Reactions");

const ThoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			maxlength: 280,
			minlength: 1,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => createdAtVal,
		},
		username: {
			type: String,
			required: true,
			ref: "Users",
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

const Thought = model("Thoughts", ThoughtSchema);

ThoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

module.exports = Thought;
