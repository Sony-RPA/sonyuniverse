const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	text: { type: String, required: true },
	name: String,
	avatar: String,
	handle: String,
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			}
		}
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			},
			text: {
				type: String,
				required: true
			},
			name: String,
			avatar: String,
			handle: String,
			date: { type: Date, default: Date.now() }	
		}	
	],
	date: { type: Date, default: Date.now() }
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post