const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	avatar: { type: String, default: "https://i.imgur.com/Nh6nPcQ.png", required: true },
	passwordReset: { type: String, default: null, select: false },
	date: { type: Date, default: Date.now() },
	lastChatRoom: { type: String, default: "0" },
	comments: [
		{
			postId: String,
			commentId: String
		}
	],
	favorites: [
		{
			postId: String
		}
	]
}, { minimize: false })

const User = mongoose.model("User", userSchema)

module.exports = User