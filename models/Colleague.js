const mongoose = require("mongoose")

const colleagueSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	connected: [Number],
	requested: [Number],
	received: [Number],
	denied: [Number]
})

const Colleague = mongoose.model("Colleague", colleagueSchema)

module.exports = Colleague