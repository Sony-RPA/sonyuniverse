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
									category: "connection-request",
									actionRequired: true,
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
				//update status of notification corresponding to the connection request in user's notification model
				Notification.findOne({user: req.user.id})
					.then((userNotifications) => {
						const targetNotification = userNotifications.notifications.filter((notification) => {
							return notification.senderId == req.params.id && notification.category == "connection-request"
						})[0]

						targetNotification.actionRequired = false
						targetNotification.seen = true

						userNotifications.save()
							.then((savedNotifcations) => {
								console.log(savedNotifcations)
							})
							.catch((errors) => {
								return res.status(400).json({ couldnotupdate: "could not update users notifications"})
							})
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotfind: "could not find users notifications"})
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

	//@desc cancel request
	//access private
	app.post("/api/colleagues/cancel/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
		//find active user's colleagues
		Colleague.findOne({user: req.user.id})
			.then((userColleagues) => {
				const cancelledColleague = req.params.id
				userColleagues.requested = userColleagues.requested.filter((colleague) => {
					return colleague !== cancelledColleague
				})
				userColleagues.save()
					.then((updatedColleagues) => {
						res.json(updatedColleagues)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotupdate: "could not save active user's colleagues"})
					})
				//remove active user from the cancelledColleague's received array
				Colleague.findOne({ user: cancelledColleague })
					.then((cancelledColleague) => {
						const activeUser = req.user.id
						cancelledColleague.received = cancelledColleague.received.filter((colleague) => {
							return colleague !== activeUser
						})
						cancelledColleague.save()
							.then((updatedCancelledColleague) => {
								console.log(updatedCancelledColleague)
							})
							.catch((errors) => {
								return res.status(400).json({ couldnotsave: "could not save cancelled-connections colleague model "})
							})
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotdelete: "could not remove requester from user's received list.'"})
					})

			})
			.catch((errors) => {
				return res.status(400).json({ couldnotdelete: "could not cancel request to connect with colleague"})
			})
		//remove corresponding notification from cancelled-connection's model
		Notification.findOne({ user: req.params.id })
			.then((foundNotifications) => {

				var removeNotificationIndex = foundNotifications.notifications.findIndex((notification) => {
					return notification.senderId == req.user.id && notification.category == "connection-request"
				})

				//remove notification
				foundNotifications.notifications.splice(removeNotificationIndex, 1)

				//save updated notifications
				foundNotifications.save()
					.then((savedNotifications) => {
						console.log(savedNotifications)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotsave: "could not save notifications upon cancelling connection request"})
					})
			})
			.catch((errors) => {
				return res.status(400).json({ couldnotfind: "could not find cancelled-connections notifications"})
			})
	})

	//@desc decline request
	//@access private
	app.post("/api/colleagues/decline/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
		//find active user's colleague model
		Colleague.findOne({ user: req.user.id })
			.then((userColleagues) => {
				const declinedColleague = req.params.id
				userColleagues.received = userColleagues.received.filter((colleague) => {
					return colleague !== declinedColleague
				})

				//add declined colleague to active user's denied list
				userColleagues.denied.unshift(declinedColleague)

				//save usersColleagues
				userColleagues.save()
					.then((updatedColleagues) => {
						res.json(updatedColleagues)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotupdate: "could not update users colleagues upon declining connection request"})
					})
			})
			.catch((errors) => {
				return res.status(400).json({ couldnotfind: "could not find users colleagues"})
			})

		//update status of notification corresponding to the connection request in user's notification model
		Notification.findOne({user: req.user.id})
			.then((userNotifications) => {
				const targetNotification = userNotifications.notifications.filter((notification) => {
					return notification.senderId == req.params.id && notification.category == "connection-request"
				})[0]

				targetNotification.actionRequired = false
				targetNotification.seen = true

				userNotifications.save()
					.then((updatedNotifications) => {
						console.log(updatedNotifications)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotupdate: "could not update users notifications upon declining connection request"})
					})
			})
			.catch((errors) => {
				return res.status(400).json({ couldnotfind: "could not find users notifications"})
			})
	})

	//@desc whitelist user
	//@access private
	app.put("/api/colleagues/whitelist/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
		//find current user's colleague model
		Colleague.findOne({ user: req.user.id })
			.then((userColleagues) => {
				const whitelistColleague = req.params.id
				userColleagues.denied = userColleagues.denied.filter((colleague) => {
					return colleague !== whitelistColleague
				})
				//add whitelist colleague to active user's received list
				userColleagues.received.unshift(whitelistColleague)

				//save userColleagues
				userColleagues.save()
					.then((updatedColleagues) => {
						res.json(updatedColleagues)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotupdate: "could not add user to whitelist"})
					})
			})
			.catch((errors) => {
				return res.status(400).json({ couldnotfind: "could not find users colleagues"})
			})
	})

}

module.exports = colleagueRoutes