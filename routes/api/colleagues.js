const passport = require("passport")
const Colleague = require("../../models/Colleague")
const Notification = require("../../models/Notification")
const User = require("../../models/User")

const colleagueRoutes = (app) => {
	//@desc get users colleagues
	//@access private
	app.get("/api/colleagues", passport.authenticate("jwt", {session: false}), (req, res) => {
		//find users colleague model
		Colleague.findOne({ user: req.user.id})
			.then((userColleagues) => {
				res.json(userColleagues)
			})
			.catch((errors) => {
				return res.status(400).json({ couldnotfind: "could not find this users colleagues" })
			})
	})

	//@desc add colleague
	//@access private
	app.post("/api/colleagues/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
		//find users colleague model
		Colleague.findOne({ user: req.user.id })
			.then((userColleagues) => {
				//add the requested colleague to the active user's requested array
				const requestedColleague = req.params.id
				userColleagues.requested.unshift(requestedColleague)
				userColleagues.save()
					.then((updatedColleagues) => {
						res.json(updatedColleagues)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotupdate: "could not update this users colleagues"})
					})

				//add the active user to the requested colleague's received array
				Colleague.findOne({ user: requestedColleague })
					.then((requestedColleague) => {
						const receivedColleague = req.user.id
						requestedColleague.received.unshift(receivedColleague)
						requestedColleague.save()
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotupdate: "could not update receivers colleagues"})
					})

				//get current user information and add a new notification for the receiever
				User.findOne({ _id: req.user.id})
					.then((currentUser) => {
						Notification.findOne({ user: req.params.id })
							.then((foundNotifications) => {
								const newNotification = {
									senderId: req.user.id,
									name: currentUser.name,
									avatar: currentUser.avatar,
									description: `${currentUser.name} has invited you to connect.`
								}
								foundNotifications.notifications.unshift(newNotification)
								//save updated notifications model
								foundNotifications.save()
							})
							.catch((errors) => {
								return res.status(400).json({ couldnotfind: "could not find notifications"})
							})
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotfind: "could not find user"})
					})
			})
			.catch((errors) => {
				return res.status(400).json({ couldnotfind: "could not find this users colleagues"})
			})
	})

	//@desc accept connection request
	//@access private
	app.put("/api/colleagues/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
		//find users colleague model
		Colleague.findOne({ user: req.user.id })
			.then((userColleagues) => {
				//remove received colleague from active user's received list
				const receivedColleague = req.params.id
				userColleagues.received = userColleagues.received.filter((colleague) => {
					return colleague !== receivedColleague
				})
				//add received colleague to active user's connected list
				userColleagues.connected.unshift(receivedColleague)
				userColleagues.save()
					.then((updatedColleagues) => {
						res.json(updatedColleagues)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotupdate: "could not add new colleague to network"})
					})
				//remove active user from the receivedColleagues's requested array
				Colleague.findOne({ user: receivedColleague })
					.then((receivedColleague) => {
						const activeUser = req.user.id
						receivedColleague.requested = receivedColleague.requested.filter((colleague) => {
							return colleague !== activeUser
						})
						//add activeUser to the receivedColleague's connected array
						receivedColleague.connected.unshift(activeUser)
						receivedColleague.save()
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotupdate: "could not update received colleagues network" })
					})
				})
				//get current user information and create a notification for the requestor
				User.findOne({ _id: req.user.id})
					.then((currentUser) => {
						Notification.findOne({ user: req.params.id })
							.then((foundNotifications) => {
								const newNotification = {
									senderId: req.user.id,
									name: currentUser.name,
									avatar: currentUser.avatar,
									description: `You are now connected with ${currentUser.name}!`
								}

								foundNotifications.notifications.unshift(newNotification)
								//save updated notifications
								foundNotifications.save()
							})
							.catch((errors) => {
								return res.status(400).json({ couldnotfind: "could not find requestors notifications"})
							})
					})

			.catch((errors) => {
				return res.status(400).json({ couldnotupdate: "could not update this users colleagues"})
			})
	})

	//@desc remove colleague
	//@access private
	app.delete("/api/colleagues/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
		//find active users colleagues
		Colleague.findOne({user: req.user.id})
			.then((userColleagues) => {
				const removedColleague = req.params.id
				userColleagues.connected = userColleagues.connected.filter((colleague) => {
					return colleague !== removedColleague
				})
				userColleagues.save()
					.then((updatedColleagues) => {
						res.json(updatedColleagues)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotupdate: "could not update active user's colleagues" })
					})
				//remove active user from the removedColleague's connected array
				Colleague.findOne({user: removedColleague})
					.then((removedColleague) => {
						const activeUser = req.user.id
						removedColleague.connected = removedColleague.connected.filter((colleague) => {
							return colleague !== activeUser
						})
						removedColleague.save()
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotupdate: "could not update removedColleague's colleagues" })
					})
			})
			.catch((errors) => {
				return res.status(400).json({ couldnotdelete: "could not delete colleague from user's network" })
			})
	})
}

module.exports = colleagueRoutes