const mongoose = require("mongoose")
const passport = require("passport")
const Colleague = require("../../models/Colleague")

const colleagueRoutes = (app) => {
	app.get("/api/colleagues", passport.authenticate("jwt", {session: false}), (req, res) => {
		//find users colleague model
		Colleague.findOne({ user: req.user.id})
			.then((userColleagues) => {
				res.json(userColleagues)
			})
			.catch((errors) => {
				res.status(400).json({ couldnotfind: "could not find this users colleagues" })
			})
	})

	//@desc add colleague
	//@access private
	app.get("/api/colleagues/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
		//find users colleague model
		Colleague.findOne({ user: req.user.id })
			.then((userColleagues) => {
				//add the requested colleague to the currentUser's requested array
				const requestedColleague = req.params.id
				userColleagues.requested.unshift(requestedColleague)
				userColleagues.save()
					.then((updatedColleagues) => {
						res.json(updatedColleagues)
					})
					.catch((errors) => {
						res.status(404).json({ couldnotupdate: "could not update this users colleagues"})
					})

				//add the currentUser to the requested colleague's received array
				Colleague.findOne({ user: requestedColleague })
					.then((requestedColleague) => {
						const recievedColleague = req.user.id
						requestedColleague.received.unshift(recievedColleague)
						requestedColleague.save()
					})
					.catch((errors) => {
						res.status(404).json({ couldnotupdate: "could not update receivers colleagues"})
					})
			})
			.catch((errors) => {
				res.status(404).json({ couldnotfind: "could not find this users colleagues"})
			})
	})
}

module.exports = colleagueRoutes