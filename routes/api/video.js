const passport = require("passport")
const Video = require("../../models/Video")
const Profile = require("../../models/Profile")
const validateVideoInput = require("../../validation/video")
const validatePostInput = require("../../validation/post")

const videoRoutes = (app) => {
	//desc get all videos
	//@access Public
	app.get("/api/videos", async (req, res) => {
		try {
			const videos = await Video.find({ readyForView: true }).populate("user", ["name", "avatar"]).sort({ date: -1 })
			res.json(videos)

		} catch (errors) {
			return res.status(400).json({ noResult: "No results found"})
		}
	})

	//desc get video by id
	//@access Public
	app.get("/api/video/:id", async (req, res) => {
		const id = req.params.id

		try {
			const video = await Video.findById(id).populate("user", ["name", "avatar"]).populate("comments.user", ["name", "avatar"])
			res.json(video)

		} catch (errors) {
			return res.status(400).json({ noResult: "No results found" })
		}
	})

	//desc add new video
	//@access Private
	app.post("/api/videos/", passport.authenticate("jwt", { session: false }), async (req, res) => {
		//validate request body
		const { errors, isValid } = validateVideoInput(req.body)

		if(!isValid){
			return res.status(400).json(errors)
		}

		//check if user has a profile. User needs profile before posting a video
		try {
			const profile = await Profile.findOne({ user: req.user.id })

			if(profile){
				const newVideo = new Video({
					user: req.user.id,
					urlPath: req.body.urlPath,
					title: req.body.title,
					description: req.body.description,
					tags: req.body.tags
				})

				const savedVideo = await newVideo.save()

				res.json(savedVideo)				
			}		

		} catch (errors) {
			return res.status(400).json({ noprofile: "user does not have profile"})
		}
	})

	//desc increase view count
	//@access Public
	app.put("/api/video/view/:id", async (req, res) => {
		try {
			const video = await Video.findOne({ _id: req.params.id })

			if(!video){
				return res.status(400).json({ notfound: "no video was found with that id"})
			}			

			video.views = video.views + 1

			const savedVideo = await video.save()

			res.json(savedVideo)

		} catch(errors) {
			return res.status(400).json({ couldnotupdate: "could not increase view count"})
		}
	})

	//desc set ready to view
	//@access Private
	app.put("/api/videos/confirm/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
		try {
			const video = await Video.findOne({ _id: req.params.id })

			if(!video){
				return res.status(400).json({ notfound: "no video was found with that id"})
			}

			if(video.user.toString() !== req.user.id){
				return res.status(401).json({ notauthorized: "you are not authorized to validate this video" })
			}

			video.readyForView = true

			const savedVideo = await video.save()

			res.json(savedVideo)


		} catch(errors) {
			return res.status(400).json({ errors: "could not validate this video"})
		}
	})

	//desc add rating to video
	app.put("/api/videos/rate/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
		try {
			const video = await Video.findById(req.params.id).populate("user", ["name", "avatar"]).populate("comments.user", ["name", "avatar"])

			//return error if video not found
			if(!video){
				return res.status(400).json({ errors: "could not find this video" })
			}
			//determine if user has already liked video
			let userIndex = video.rating.findIndex((rating) => rating.user.toString() === req.user.id)
			//update their rating vote if user has already voted
			if(userIndex !== -1){
				video.rating[userIndex].stars = req.body.stars
			//otherwise create a new vote
			} else {
				video.rating.push({ user: req.user.id, stars: req.body.stars })
			}
			//save video
			const savedVideo = await video.save()

			res.json(savedVideo)


		} catch (errors) {
			return res.status(400).json({ errors: "could not rate this video"})
		}
	})

	//desc add comment
	//@access Private
	app.post("/api/videos/comment/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
		const { errors, isValid } = validatePostInput(req.body)

		//check validation
		if(!isValid){
			return res.status(400).json(errors)
		}

		try {
			//find video
			const video = await Video.findById(req.params.id)
			//create comment
			const newComment = {
				user: req.user.id,
				text: req.body.text
			}
			//add comment to video
			video.comments.unshift(newComment)

			//save video
			await video.save()

			//get updated video (we need to populate this user's avatar)
			const updatedVideo = await Video.findById(req.params.id).populate("user", ["name, avatar"]).populate("comments.user", ["name", "avatar"])

			res.json(updatedVideo)

		} catch (errors) {
			console.log(errors)
			return res.status(400).json({ errors: "could not add comment to video" })
		}

	})

	//desc delete a comment
	//@access Private
	app.delete("/api/videos/comment/:videoId/:commentId", passport.authenticate("jwt", { session: false }), async (req, res) => {
		try {
			//find video that owns comment
			const video = await Video.findById(req.params.videoId).populate("user", ["name, avatar"]).populate("comments.user", ["name", "avatar"])

			if(!video){
				return res.status(400).json({ errors: "could not find this video"})
			}

			//find comment index
			const commentIndex = video.comments.findIndex((comment) => comment._id.toString() === req.params.commentId)

			//remove comment from video
			video.comments.splice(commentIndex, 1)

			//save video
			const savedVideo = await video.save()

			res.json(savedVideo)

		} catch (errors) {
			console.error(errors)
			return res.status(400).json({ errors: "could not delete this comment" })
		}
	})


	//desc delete video
	//@access Private
	app.delete("/api/videos/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
		try{
			const video = await Video.findById(req.params.id)

			if(!video){
				return res.status(400).json({ errors: "could not find this video"})
			}

			if(video.user.toString() !== req.user.id){
				return res.status(401).json({ notauthorized: "you are not authorized to delete this video" })
			}

			await video.remove()

			res.json({ success: true })

		} catch (errors) {
			console.error(errors)
			return res.status(400).json({ errors: "could not delete this video"})
		}
	})
}

module.exports = videoRoutes