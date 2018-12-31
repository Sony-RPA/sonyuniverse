const Notification = require("../../models/Notification")
const passport = require("passport")

const notificationRoutes = (app) => {
	//@desc get users notifications
	//@access private
	app.get("/api/notification", passport.authenticate("jwt", { session: false }), (req, res) => {
		//find current user's notifications
		Notification.findOne({user: req.user.id})
			.then((foundNotifications) => {
				let notifications = foundNotifications.notifications 
				res.json(notifications)
			})
			.catch((errors) => {
				return res.status(400).json({error: "could not find notifications"})
			})
	})

	//@desc update notification
	//@access private
	app.put("/api/notification/:id", passport.authenticate("jwt", { session: false}), (req, res) => {
		Notification.findOne({ user: req.user.id })
			.then((foundNotifications) => {
				//find notification to update
				const targetNotification = foundNotifications.notifications.filter((notif) => (notif.id == req.params.id))[0]

				//change status of seen
				targetNotification.seen = true

				//save notification model
				foundNotifications.save()
					.then((savedNotifications) => {
						//send back the notification that was updated
						res.json(targetNotification)
					})
					.catch((errors) => {
						return res.status(400).json({ errors: "Could not update notification"})
					})

			})
			.catch((errors) => {
				return res.status(400).json({ errors: "Could not find notifications"})
			})
	})
}

module.exports = notificationRoutes