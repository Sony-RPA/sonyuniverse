const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
	users: [String],
	messages: [
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
			date: { 
				type: Date,
				default: Date.now()
			}			
		}
	]
})

const Conversation = mongoose.model("Conversation", conversationSchema)

module.exports = Conversation