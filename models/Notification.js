const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	notifications: [
		{
			date: { type: Date, default: Date.now(), required: true },
			senderId: String,
			name: String,
			avatar: String,
			description: String,
			seen: { type: Boolean, default: false, required: true }
		}
	]
})

const Notification = mongoose.model("Notification", notificationSchema)

module.exports = Notification