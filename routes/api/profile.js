const mongoose = require("mongoose")
const User = require("../../models/User")
const Profile = require("../../models/Profile")
const passport = require("passport")
const validateProfileInput = require("../../validation/profile")
const validateExperienceInput = require("../../validation/experience")
const validateEducationInput = require("../../validation/education")


//@desc Tests profile route
//@access Public
const profileRoutes = (app) => {
	app.get("/api/profile/tests", (req, res) => {
		res.json({msg: "profiles work"})
	})

//@desc get current user profile
//@access Private 
//since we arent using passport.deserialzeUser() to create our user model and make it available globally,
//we will use passport.authenticate to protect the route and give us access to req.user
	app.get("/api/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
		const errors = {}
		Profile.findOne({ user: req.user.id })
			.populate("user", ["name", "avatar"])
			.then((foundProfile) => {
				if(!foundProfile){
					errors.noprofile = "There is no profile for this user"
					return res.status(404).json(errors)
				}
				res.json(foundProfile)
			})
			.catch((error) => {
				return res.status(404).json(error)
			})
	})


//@desc get all profiles
//@access Public
	app.get("/api/profile/all", (req, res) => {
		const errors = {}
		Profile.find()
			.populate("user", ["name", "avatar"])
			.then((foundProfiles) => {
				if(!foundProfiles){
					errors.noprofile = "There are no profiles"
					return res.status(404).json(errors)
				}

				res.json(foundProfiles)
			})
			.catch((error) => {
				return res.status(404).json({ profile: "There are no profiles" })
			})
	})


//@desc get profile by handle
//@access Public
	app.get("/api/profile/handle/:handle", (req, res) => {
		const errors = {}
		Profile.findOne({ handle: req.params.handle })
			.populate("user", ["name", "avatar"])
			.then((foundProfile) => {
				if(!foundProfile){
					errors.noprofile = "There is no profile for this user"
					res.status(404).json(errors)
				}

				res.json(foundProfile)
			})
			.catch((error) => {
				res.status(404).json(error)
			})
	})

//@desc get profile by user id
//@access Public
	app.get("/api/profile/user/:user_id", (req, res) => {
		const errors = {}
		Profile.findOne({ user: req.params.user_id })
			.populate("user", ["name", "avatar"])
			.then((foundProfile) => {
				if(!foundProfile){
					errors.noprofile = "There is no profile for this user"
					res.status(404).json(errors)
				}

				res.json(foundProfile)
			})
			.catch((error) => {
				res.status(404).json({profile: "There is no profile for this user"})
			})
	})	

//@desc create or edit user profile
//@access Private
	app.post("/api/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
		//destructuring the object being returned when calling validateProfileInput with req.body
		const { errors, isValid } = validateProfileInput(req.body)

		//check validation
		if(!isValid){
			//Return any errors with 400 status
			return res.status(400).json(errors)
		}

		//Get fields from req.body and store them in our profileFields object
		const profileFields = {} //will be used to create or update the profile
		profileFields.user = req.user.id
		if(req.body.handle) profileFields.handle = req.body.handle
		if(req.body.company) profileFields.company = req.body.company
		if(req.body.website) profileFields.website = req.body.website
		if(req.body.location) profileFields.location = req.body.location
		if(req.body.bio) profileFields.bio = req.body.bio
		if(req.body.status) profileFields.status = req.body.status
		if(req.body.githubusername) profileFields.githubusername = req.body.githubusername
		// Skills - Split into array
		if(typeof req.body.skills !== "undefined"){
			profileFields.skills = req.body.skills.split(",")
		}

		//Social
		profileFields.social = {}
		if(req.body.youtube) profileFields.social.youtube = req.body.youtube
		if(req.body.twitter) profileFields.social.twitter = req.body.twitter
		if(req.body.facebook) profileFields.social.facebook = req.body.facebook
		if(req.body.instagram) profileFields.social.instagram = req.body.instagram
		if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
		if(req.body.status) profileFields.status = req.body.status
		
		Profile.findOne({ user: req.user.id })
			.then((foundProfile) => {
				if(foundProfile){
					//Update profile
					Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
						.then((updatedProfile) => {
							res.json(updatedProfile)
						})
				} else{
					//Create profile
					//check if handle (username) exists
					Profile.findOne({ handle: profileFields.handle })
						.then((foundProfile) => {
							if(foundProfile){
								errors.handle = "That handle already exists"
								res.status(400).json(errors)
							}
							//Save Profile
							new Profile(profileFields).save()
								.then((newProfile) => {
									res.json(newProfile)
								})
						})
				}
			})																
	})

//@desc add experience to profile
//@accesss Private
	app.post("/api/profile/experience", passport.authenticate("jwt", { session: false }), (req, res) => {
		const { errors, isValid } = validateExperienceInput(req.body)

		//Check validation
		if(!isValid){
			//Return any errors with 400 status
			return res.status(400).json(errors)
		}

		Profile.findOne({ user: req.user.id })
			.then((foundProfile) => {
				const newExp = {
					title: req.body.title,
					company: req.body.company,
					location: req.body.location,
					from: req.body.from,
					to: req.body.to,
					current: req.body.current,
					description: req.body.description
				}

				//Add to experience array
				foundProfile.experience.unshift(newExp)

				foundProfile.save()
					.then((updatedProfile) => {
						res.json(updatedProfile)
					})
			})
	})

//@desc add education to profile
//@accesss Private
	app.post("/api/profile/education", passport.authenticate("jwt", { session: false }), (req, res) => {
		const { errors, isValid } = validateEducationInput(req.body)

		//Check validation
		if(!isValid){
			//Return any errors with 400 status
			return res.status(400).json(errors)
		}

		Profile.findOne({ user: req.user.id })
			.then((foundProfile) => {
				const newEdu = {
					school: req.body.school,
					degree: req.body.degree,
					fieldofstudy: req.body.fieldofstudy,
					from: req.body.from,
					to: req.body.to,
					current: req.body.current,
					description: req.body.description
				}

				//Add to experience array
				foundProfile.education.unshift(newEdu)

				foundProfile.save()
					.then((updatedProfile) => {
						res.json(updatedProfile)
					})
			})
	})

//@desc delete experience from profile
//@accesss Private
	app.delete("/api/profile/experience/:exp_id", passport.authenticate("jwt", { session: false }), (req, res) => {

		Profile.findOne({ user: req.user.id })
			.then((foundProfile) => {
				//Get remove index
				const removeIndex = foundProfile.experience
					.map((item) => {
						return item.id
					})
					.indexOf(req.params.exp_id)

				//Splice unwanted item out of array
				foundProfile.experience.splice(removeIndex, 1)				

				//Save the updated profile
				foundProfile.save()
					.then((updatedProfile) => {
						res.json(updatedProfile)
					})
			})
			.catch((error) => {
				res.status(404).json(error)
			})
	})

//@desc delete education from profile
//@accesss Private
	app.delete("/api/profile/education/:edu_id", passport.authenticate("jwt", { session: false }), (req, res) => {

		Profile.findOne({ user: req.user.id })
			.then((foundProfile) => {
				//Get remove index
				const removeIndex = foundProfile.education
					.map((item) => {
						return item.id
					})
					.indexOf(req.params.edu_id)

				//Splice unwanted item out of array
				foundProfile.education.splice(removeIndex, 1)				

				//Save the updated profile
				foundProfile.save()
					.then((updatedProfile) => {
						res.json(updatedProfile)
					})
			})
			.catch((error) => {
				res.status(404).json(error)
			})
	})

//@desc delete user and profile
//@access Private
	app.delete("/api/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
		Profile.findOneAndRemove({ user: req.user.id })
			.then(() => {
				User.findOneAndRemove({ _id: req.user.id })
					.then(() => {
						res.json({ success: true })
					})
			})
	})

}

module.exports = profileRoutes