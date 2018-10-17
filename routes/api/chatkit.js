const passport = require("passport")
const Chatkit = require("@pusher/chatkit-server")
const isEmpty = require("../../validation/is-empty")

//setup Chatkit
const instanceLocator = require("../../config/keys").instanceLocator
const chatkitKey = require("../../config/keys").chatkitKey
const chatkitInstance = new Chatkit.default({
	instanceLocator: instanceLocator,
	key: chatkitKey
})

const chatkitRoutes = (app) => {
	//@desc create new chatkit user
	//@access Private
	app.post("/api/channels/create-user", passport.authenticate("jwt", {session: false}), (req, res) => {
		const { username } = req.body
		//check data provided by user
		if(isEmpty(username)){
			res.status(404).json({ error: "A username is required to continue"})
		}
		//create user in chatkit
		chatkitInstance.createUser({
			name: username,
			id: username
		})
		.then((createdUser) => {
			res.json(createdUser)
		})
		.catch((errors) => {
			if(errors.error === "services/chatkit/user_already_exists"){
				//user is re-entering the chat, do not register error. Send a successful response
				res.json({ name: username, id: username })
			} else {
				//send an error response
				res.status(404).json({ error: "Could not enter channel at this time. Please try again."})
			}
		})
	})

	//@desc authenticate chatkit user
	//@access Public
	app.post("/api/channels/authenticate", (req, res) => {
		const authenticatedUser = chatkitInstance.authenticate({ grant_type: "client_credentials", userId: req.query.user_id})
		res.json(authenticatedUser.body)
	})
}

module.exports = chatkitRoutes