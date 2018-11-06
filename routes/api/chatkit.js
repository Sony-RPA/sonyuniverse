const passport = require("passport")
const Chatkit = require("@pusher/chatkit-server")
const User = require("../../models/User")

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
		//create user in chatkit
		chatkitInstance.createUser({
			name: req.user.id,
			id: req.user.id
		})
		.then((createdUser) => {
			res.json(createdUser)
		})
		.catch((errors) => {
			if(errors.error === "services/chatkit/user_already_exists"){
				//user is re-entering the chat, do not register error. Send a successful response
				res.json({ name: req.user.id, id: req.user.id })
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

	//@desc get names of all chatkit users
	//@access private
	app.post("/api/channels/users", passport.authenticate("jwt", {session: false}), (req, res) => {
		const userIds = req.body.userIds
		User.find({ _id: { $in: userIds }})
			.then((foundUsers) => {
				let users = foundUsers.map((user) => {
					return { 
						id: user._id,
						name: user.name,
						avatar: user.avatar,
						lastChatRoom: user.lastChatRoom}
				})
				res.json(users)
			})
			.catch((errors) => {
				res.status(404).json({error: "could not find users"})
			})
	})

	//@desc record last room of current user
	//@access private
	app.post("/api/channels/record-last-room", passport.authenticate("jwt", { session: false}), (req, res) => {
		const lastRoom = req.body
		User.findById(req.user.id)
			.then((foundUser) => {
				foundUser.lastChatRoom = lastRoom.id
				foundUser.save()
					.then((savedUser) => {
						res.json(savedUser)
					})
					.catch((errors) => {
						res.status(404).json({errors: "could not update last room of user"})
					})
			})
			.catch((errors) => {
				res.status(404).json({error: "could not find user"})
			})
	})
}

module.exports = chatkitRoutes