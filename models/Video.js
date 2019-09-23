const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	urlPath: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	readyForView: {
		type: Boolean,
		default: false
	},
	tags: [String],
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
			date: {
				type: Date,
				default: Date.now()
			}
		}
	],
	date: {
		type: Date,
		default: Date.now()
	},
	views: {
		type: Number,
		default: 0
	},
	rating: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			},
			stars: {
				type: Number
			}
		}
	]
})

const Video = mongoose.model("Video", videoSchema)

module.exports = Video