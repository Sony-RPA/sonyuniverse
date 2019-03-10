const mongoose = require("mongoose")
const passport = require("passport")
const Post = require("../../models/Post")
const Profile = require("../../models/Profile")
const validatePostInput = require('../../validation/post')

const postsRoutes = (app) => {
//@desc Tests posts route
//@access Public
	app.get("/api/posts/tests", (req, res) => {
		res.json({msg: "posts work"})
	})

//@desc get all posts
//access Public
	app.get("/api/posts/", (req, res) => {
		Post.find()
			.sort({ date: -1 })
			.then((allPosts) => {
				res.json(allPosts)
			})
			.catch((error) => {
				return res.status(400).json({ nopostsfound: "No posts found"})
			})
	})	

//desc get post by id
//access Public
	app.get("/api/posts/:post_id", (req, res) => {
		Post.findById({ _id: req.params.post_id })
			.then((foundPost) => {
				res.json(foundPost)
			})
			.catch((error) => {
				return res.status(400).json({ nopostfound: "No post found"})
			})
	})

//@desc create new post
//access Private
	app.post("/api/posts/", passport.authenticate("jwt", { session: false }), (req, res) => {
		//destructure return output from function, which checks our inputs for any errors
		const { errors, isValid } = validatePostInput(req.body)

		//check validation
		if(!isValid){
			//If any errors, send a 400 error 
			return res.status(400).json(errors)
		}
		//check if user has a profile. they need a profile to create a post.
		Profile.findOne({ user: req.user.id })
			.then((foundProfile) => {
				const newPost = new Post({
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id,
					handle: foundProfile.handle
				})

				newPost.save()
					.then((createdPost) => {
						res.json(createdPost)
					})
					.catch((errors) => {
						return res.status(400).json({ postnotcreated: "could not create new post"})
					})
			})
			.catch((errors) => {
				return res.status(400).json({ profilenotfound: "You must set up your profile before creating a post"})
			})
	})

//@desc delete post
//access Private
	app.delete("/api/posts/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
		Profile.findOne({ user: req.user.id })
			.then((foundProfile) => {
				Post.findById({ _id: req.params.post_id })
					.then((foundPost) => {
						//Check for post owner
						if(foundPost.user.toString() !== req.user.id){
							return res.status(400).json({ notauthorized: "You are not authorized to delete this post."})
						}

						//Delete
						foundPost.remove()
							.then(() => {
								res.json({ success: true })
							})

					})
					.catch((error) => {
						return res.status(400).json({ postnotfound: "No post found" })
					})
			})
	})

//@desc like post
//@access Private
	app.post("/api/posts/like/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
		Profile.findOne({ user: req.user.id })
			.then((foundProfile) => {
				Post.findById({ _id: req.params.post_id })
					.then((foundPost) => {
						//filter foundPost.likes array to check if the loggedin user has already liked this post
						if(foundPost.likes.filter(like => like.user.toString() === req.user.id).length > 0){
							return res.status(400).json({ alreadyliked: "User already liked this post" })
						}

						//Add user id to the likes array
						foundPost.likes.unshift({ user: req.user.id })

						foundPost.save()
							.then((savedPost) => {
								res.json(savedPost)
							})
					})
					.catch((error) => {
						return res.status(400).json({ postnofound: "No post found "})
					})
			})
	})

//@desc unlike post	
//@access Private
	app.post("/api/posts/unlike/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
		Profile.findOne({ user: req.user.id })
			.then((foundProfile) => {
				Post.findById({ _id: req.params.post_id })
					.then((foundPost) => {
						//filter foundPost.likes array to check if the loggedin user has already liked this post
						if(foundPost.likes.filter(like => like.user.toString() === req.user.id).length === 0){
							return res.status(400).json({ notliked: "You have not liked this post" })
						}

						//Get remove index
						const removeIndex = foundPost.likes
							.map((like) => {
								return like.user.toString()
							})
							.indexOf(req.user.id)

						//Remove user id from the likes array
						foundPost.likes.splice(removeIndex, 1)

						//Save Post
						foundPost.save()
							.then((savedPost) => {
								res.json(savedPost)
							})
					})
					.catch((error) => {
						return res.status(400).json({ postnotfound: "No post found" })
					})
			})
	})

//@desc add comment
//@access Private
	app.post("/api/posts/comment/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
		//destructure return output from function, which checks our inputs for any errors
		const { errors, isValid } = validatePostInput(req.body)

		//check validation
		if(!isValid){
			//If any errors, send a 400 error 
			return res.status(400).json(errors)
		}

		Post.findById({ _id: req.params.post_id })
			.then((foundPost) => {
				//a profile is required create a comment, check if the user has one
				Profile.findOne({ user: req.user.id })
					.then((foundProfile) => {
						const newComment = {
							text: req.body.text,
							name: req.body.name,
							avatar: req.body.avatar,
							user: req.user.id,
							handle: foundProfile.handle
						}
						//Add to comments array
						foundPost.comments.unshift(newComment)

						//Save post with new comment
						foundPost.save()
							.then((savedPost) => {
								res.json(savedPost)
							})
					})
					.catch((errors) => {
						return res.status(400).json({ profilenotfound: "You must set up your profile before creating a post."})
					})
			})
			.catch((error) => {
				return res.status(400).json({ postnotfound: "No post found" })
			})
	})

//@desc delete comment
//@access Private
	app.delete("/api/posts/comment/:post_id/:comment_id", passport.authenticate('jwt', { session: false }), (req, res) => {
		Post.findById({ _id: req.params.post_id })
			.then(foundPost => {
			// Check to see if comment exists
				if (foundPost.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
					return res.status(404).json({ commentnotexists: 'Comment does not exist' });
				}

			//Get remove index
			const removeIndex = foundPost.comments
				.map((comment) => {
					return comment._id.toString()
				})
				.indexOf(req.params.comment_id);

			// Splice comment out of array
			foundPost.comments.splice(removeIndex, 1);

			foundPost.save().then(post => res.json(foundPost));

			})
			.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
	})

//@desc edit post
//@access Private
	app.put("/api/posts/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
		//check if post has at least 2 characters
		const { errors, isValid } = validatePostInput(req.body)

		if(!isValid){
			return res.status(400).json(errors)
		}

		Post.findById({ _id: req.params.post_id })
			.then((foundPost) => {
				//update post
				foundPost.text = req.body.text

				//save post
				foundPost.save()
					.then((savedPost) => {
						res.json(savedPost)
					})
					.catch((errors) => {
						res.status(400).json({couldnotupdate: "Could not save this post. Please try again."})
					})
			})
			.catch((errors) => {
				res.status(400).json({ couldnotfind: "We could not find this post. Please try again."})
			})
	})

//@desc edit comment
//@access Private
	app.put("/api/posts/comment/:post_id/:comment_id", passport.authenticate("jwt", { session: false }), (req, res) => {
		//check if post has at least 2 characters
		const { errors, isValid } = validatePostInput(req.body)

		if(!isValid){
			return res.status(400).json(errors)
		}

		Post.findById({ _id: req.params.post_id })
			.then((foundPost) => {
				//find comment
				var commentIndex = foundPost.comments.findIndex((comment) => {
					return (comment._id).toString() == req.params.comment_id
				})

				//update comment text
				foundPost.comments[commentIndex].text = req.body.text

				//save post with updated comments
				foundPost.save()
					.then((savedPost) => {
						res.json(savedPost)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotupdate: "comment could not be updated. Please try again."})
					})

			})
			.catch((errors) => {
				return res.status(400).json({ couldnotfind: "we could not find this comment."})
			})
	})

}

module.exports = postsRoutes