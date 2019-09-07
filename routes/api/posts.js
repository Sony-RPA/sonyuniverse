const mongoose = require("mongoose")
const passport = require("passport")
const Post = require("../../models/Post")
const Profile = require("../../models/Profile")
const validatePostInput = require('../../validation/post')
const User = require("../../models/User")
const escapeRegex = require("../../validation/escapeRegex")

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
				//save post
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

						//Remove all references to this post in all participated User models
						foundPost.commenters.forEach((commenter) => {
							User.findOne({ _id: commenter })
								.then((foundUser) => {
									foundUser.comments = foundUser.comments.filter((comment) => {
										return comment.postId !== req.params.post_id
									})

									foundUser.save()
										.then((savedUser) => {
											console.log(savedUser)
										})
										.catch((errors) => {
											console.log("could not save User")
										})
								})
								.catch((errors) => {
									console.log("could not find commenters")
								})
						})

						//Delete Post
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
						//check if commenter has been recorded
						if(!foundPost.commenters.includes(req.user.id)){
							foundPost.commenters.unshift(req.user.id)
						}

						//Save post with new comment
						foundPost.save()
							.then((savedPost) => {
								//make a record of this post in User model
								User.findOne({ _id: req.user.id })
									.then((foundUser) => {
										foundUser.comments.unshift({ postId: savedPost._id, commentId: savedPost.comments[0]._id })
										//save user
										foundUser.save()
											.then((savedUser) => {
												res.json(savedPost)
											})
											.catch((errors) => {
												return res.status(400).json({ couldnotsave: "could not save comment for user"})
											})
									})
									.catch((errors) => {
										return res.status(400).json({ couldnotupdate: "could not find a user with this id"})
									})
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
			var removeCommentIndex = foundPost.comments
				.map((comment) => {
					return comment._id.toString()
				})
				.indexOf(req.params.comment_id);

			//Splice comment out of array
			foundPost.comments.splice(removeCommentIndex, 1);

			//remove from commenter array if there are no posts from this user
			const commenters = foundPost.comments.map((comment) => comment.user.toString())

			//check if there are any comments remaining from this user. if none, remove user completely from commenters list
			if(!commenters.includes(req.user.id)){
				var removeCommenterIndex = foundPost.commenters.findIndex((commenter) => {
					return commenter == req.user.id
				})

				foundPost.commenters.splice(removeCommenterIndex, 1)
			}

			foundPost.save()
				.then((post) => {
					res.json(foundPost)
				})
				.catch((errors) => {
					return res.status(400).json({ couldnotsave: "Could not save post"})
				})
			})
			.catch((err) => {
				res.status(404).json({ postnotfound: 'No post found' })
			});

		//remove reference of comment in User model
		User.findOne({ _id: req.user.id})
			.then((foundUser) => {
				var removeCommentIndex = foundUser.comments.findIndex((comment) => {
					return comment.commentId == req.params.comment_id
				})

				//remove comment
				foundUser.comments.splice(removeCommentIndex, 1)
				//save user
				foundUser.save()
					.then((savedUser) => {
						console.log(savedUser)
					})
					.catch((errors) => {
						console.log("could not save user")
					})
			})
			.catch((errors) => {
				return res.status(400).json({ couldnotfind: "could not find the user model to update"})
			})
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

	//@desc get posts related to search
	//@access Private
	app.get("/api/posts/search/:text", passport.authenticate("jwt", { session: false}), (req, res) => {
		var query = req.params.text
		var regex = new RegExp(escapeRegex(query), "gi")
		//find profiles that match the users query
		Post.find({ text: regex })
			.then((foundPosts) => {
				res.json(foundPosts)
			})
			.catch((errors) => {
				return res.status(400).json({ couldnotfind: "could not find any posts related to this search"})
			})
	})

	//@desc add favoriter
	//@access Private
	app.post("/api/posts/favorite/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
		Post.findById({ _id: req.params.post_id })
			.then((foundPost) => {

				if(foundPost.favoriters.filter((favoriter) => favoriter.user.toString() == req.user.id).length > 0){
					return res.status(400).json({ couldnotfavorite: "could not favorite post, already favorited."})
				}

				//Add user to favorites array
				foundPost.favoriters.unshift({ user: req.user.id })

				foundPost.save()
					.then((savedPost) => {
						res.json(savedPost)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotsave: "could not save favorited post"})
					})

				//get current user
				User.findOne({ _id: req.user.id })
					.then((foundUser) => {
						//add postId to favorites list
						foundUser.favorites.unshift({ postId: req.params.post_id})

						foundUser.save()
							.then((savedUser) => {
								// console.log(savedUser.favorites)
							})
							.catch((errors) => {
								console.log("could not save user favorites")
							})
					})
					.catch((errors) => {
						console.log("could not find current user")
					})

			})
			.catch((errors) => {
				return res.status(400).json({ couldnotfind: "could not find post" })
			})
	})

	//@desc remove favoriter
	//@access Private
	app.post("/api/posts/unfavorite/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
		Post.findById({ _id: req.params.post_id })
			.then((foundPost) => {

				if(foundPost.favoriters.filter((favoriter) => favoriter.user.toString() == req.user.id).length === 0){
					return res.status(400).json({ couldnotunfavorite: "could not unfavorite, not yet favorited"})
				}

				//get index of user in list
				const removeIndex = foundPost.favoriters.findIndex((favoriter) => {
					(favoriter.user).toString() == req.user.id
				})

				//remove user from list
				foundPost.favoriters.splice(removeIndex, 1)

				//savePost
				foundPost.save()
					.then((savedPost) => {
						res.json(savedPost)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotsave: "could not save post"})
					})

				User.findOne({ _id: req.user.id })
					.then((foundUser) => {

						const allFavoritesPostId = foundUser.favorites.map((favorite) => favorite.postId.toString())

						const thisPostIndex = allFavoritesPostId.indexOf(req.params.post_id)

						foundUser.favorites.splice(thisPostIndex, 1)

						foundUser.save()
							.then((savedUser) => {
								// console.log(savedUser)
							})
							.catch((errors) => {
								// console.log(errors)
							})
					})
					.catch((errors) => {
						console.log("could not find user")
					})

			})
			.catch((errors) => {
				return res.status(404).json({ couldnotfind: "could not find post" })
			})
	})

	//@desc	Get favorite posts
	//@access Private
	app.get("/api/favorites", passport.authenticate("jwt", { session: false }), (req, res) => {
		User.findOne({ _id: req.user.id })
			.then((foundUser) => {
				const favoritePostsIds = foundUser.favorites.map((post) => post.postId)

				Post.find({ _id: { $in:  [...favoritePostsIds] }})
					.then((foundPosts) => {
						res.json(foundPosts)
					})
					.catch((errors) => {
						return res.status(400).json({ couldnotfind: "could not find favorite posts"})
					})
			})
			.catch((errors) => {
				return res.status(400).json({ couldnotfind: "could not find user"})
			})
	})


}

module.exports = postsRoutes