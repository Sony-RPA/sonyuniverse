const passport = require("passport")
const Conversation = require("../../models/Conversation")
const validateMessageInput = require("../../validation/message")

const conversationRoutes = (app) => {
	//@desc create new conversation or continue conversation
	//@access private
	app.post("/api/conversations", passport.authenticate("jwt", { session: false }), (req, res) => {
		//find existing conversation
		const users = req.body.users
		Conversation.findOne({ users: { $all: [...users] }})
			.then((foundConversation) => {
				//if no conversation is found, create a new conversation
				if(!foundConversation){
					const newConversation = new Conversation({
						users: users
					})
					newConversation.save()
						.then((createdConversation) => {
							res.json(createdConversation)
						})
						.catch((error) => {
							return res.status(400).json({ error: "could not retrieve conversation" })
						})
				} else {
					//if conversation is found, then respond with the found results
					res.json(foundConversation)
				}
			})
			.catch((errors) => {
				return res.status(400).json({ error: "could not start a new conversation" })
			})
	})

	//@desc add a message to a conversation
	//@access private
	app.post("/api/conversation/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
		//validate data for message creation
		const { errors, isValid } = validateMessageInput(req.body)

		//if data is not valid, return a errors response. This will end the route.
		if(!isValid){
			return res.status(400).json(errors)
		}
		//if data is valid, go find a matching conversation
		const conversationId = req.params.id
		Conversation.findOne({ _id: conversationId })
			.then((foundConversation) => {
				const newMessage = {
					user: req.user.id,
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar
				}
				//Add messsage to end of messages array
				foundConversation.messages.push(newMessage)
				//Save conversation
				foundConversation.save()
					.then((savedConversation) => {
						res.json(savedConversation)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotsave: "could not save conversation"})
					})
			})
			.catch((errors) => {
				return res.status(400).json({ couldnotmessage: "could not create a new message at this time"})
			})
	})
}

module.exports = conversationRoutes