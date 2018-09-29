const crypto = require("crypto")
const User = require("../../models/User")
const Post = require("../../models/Post")
const Colleague = require("../../models/Colleague")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")
const passport = require("passport")
const mailgun = require("mailgun-js")({
	apiKey: keys.apiKey,
	domain: keys.domain
})

//Load input validation
const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")
const validateAvatarInput = require("../../validation/avatar")
const validateChangePasswordInput = require("../../validation/changePassword")

const authRoutes = (app) => {
//@desc Tests auth route
//@access Public
	app.get("/api/users/tests", (req, res) => {
		res.json({msg: "Users work"})
	})

//@desc Register user
//@access Public
	app.post("/api/users/register", (req, res) => {
		//destructuring the object being returned when calling validateRegisterInput with req.body
		const { errors, isValid } = validateRegisterInput(req.body)

		//check validation
		if(!isValid){
			//return any errors with 400 status
			return res.status(400).json(errors)
		}

		User.findOne({ email: req.body.email })
			.then((user) => {
				//check if user already exists
				if(user){
					errors.email = "Email already exists"
					return res.status(400).json(errors)
				} else {
					//create user
					const newUser = new User({
						name: req.body.name,
						email: req.body.email,
						password: req.body.password
					})

					//encrypt user password
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if(err){
								throw err
							}
							newUser.password = hash
							newUser.save()
								.then((createdUser) => {
									res.json(createdUser)
									//create a colleague model for the new user
									const userId = createdUser._id
									new Colleague({ user: userId}).save()

								})
								.catch((err) => {
									console.log(err)
								})
						})
					})
				}
			})
	})

//@desc saveresethash
//@access public
	app.post("/api/users/saveresethash", async (req, res) => {
		//check and make sure the email exists
		  User.findOne({ email: req.body.email})
		  	.then((foundUser) => {
		  		//if user exists, save their password hash
		  		const timeInMs = Date.now()
		  		const hashString = `${req.body.email}${timeInMs}`
		  		const secret = keys.cryptoSecret
		  		const hash = crypto.createHmac("sha256", secret)
		  					       .update(hashString)
		                       	   .digest("hex")
		    	foundUser.passwordReset = hash

		    	foundUser.save()
		    		.then((savedUser) => {
		    			//generate the email to reset password
						const emailData = {
							from: 'CloseBrace <postmaster@sandboxcc80cfa391224d5d83e5aba2d09b7590.mailgun.org>',
							to: savedUser.email,
							subject: 'Reset Your Password',
							text: `A password reset has been requested for the Sony Universe account connected to this email address. If you made this request, please click the following link: https://www.sonyuniverse.org/change-password/${savedUser.passwordReset} ... if you didn't make this request, feel free to ignore it!`,
							html: `<p>A password reset has been requested for the Sony Universe account connected to this email address. If you made this request, please click the following link: <a href="https://www.sonyuniverse.org/change-password/${savedUser.passwordReset}&quot; target="_blank">https://www.sonyuniverse.org/change-password/${savedUser.passwordReset}</a>.</p><p>If you didn't make this request, feel free to ignore it!</p>`
						}

						//send the email
						mailgun.messages().send(emailData, (error, body) => {
							if(error || !body){
								res.status(404).json({ error: "Something went wrong while attempting to reset your password. Please Try again"})
							} else {
								res.json({ success: true })
							}
						})
		    		})
		    		.catch((errors) => {
		    			res.status(404).json({ error: "Something went wrong while attempting to reset your password. Please Try again" })
		    		})
		  	})
		  	.catch((errors) => {
		  		res.status(404).json({ error: "Something went wrong while attempting to reset your password. Please Try again" })
		  	})
		});

//@desc change user password
//access Private
	app.post("/api/users/changepassword", passport.authenticate("jwt", { session: false}), (req, res) => {
		const { errors, isValid } = validateChangePasswordInput(req.body)

		//check validation
		if(!isValid){
			return res.status(400).json(errors)
		}
	})

//@desc login user /returning Token
//@access Public
	app.post("/api/users/login", (req, res) => {
		const { errors, isValid } = validateLoginInput(req.body)

		//check validation
		if(!isValid){
			return res.status(400).json(errors)
		}		

		const email = req.body.email
		const password = req.body.password

		User.findOne({ email: email })
			.then((foundUser) => {
				//check for user
				if(!foundUser){
					errors.email = "User not found"
					return res.status(404).json({ email: errors.email })
				}
				//check password
				bcrypt.compare(password, foundUser.password)
					.then((isMatch) => {
						if(isMatch){
							//Create jwt payload
							const payload = { 
								id: foundUser.id, 
								name: foundUser.name,
								avatar: foundUser.avatar
							}

							//Sign Token with user info. Then Token will be used for this logged in session.
							jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
								res.json({
									success: true,
									token: "Bearer " + token 
								})
							})

						} else {
							errors.password = "Password incorrect"
							return res.status(400).json({ password: errors.password })
						}
					})
			})
	})

//@desc Update avatar
//@access Private
	app.post("/api/users/avatar", passport.authenticate("jwt", { session: false }), (req, res) => {
		const { errors, isValid } = validateAvatarInput(req.body)

		if(!isValid){
			return res.status(404).json(errors)
		}

		const avatar = req.body.avatar

		//update user with new avatar
		User.findOneAndUpdate({ _id: req.user.id }, { avatar: avatar })
			.then((updatedUser) => {
				updatedUser.save()
					.then((savedUser) => {
						res.json(savedUser)
					})
					.catch((errors) => {
						console.log(errors)
					})
			})
			.catch((errors) => {
				return res.status(404).json({ couldnotupdate: "Could not update avatar"})
			})

		//update all user posts with the new avatar
		Post.updateMany({ user: req.user.id }, { avatar: avatar })
			.then((updatedPosts) => {
				updatedPosts.save()
					.then((savedPosts) => {
						console.log(savedPosts)
					})
					.catch((errors) => {
						return res.status(404).json({ couldnotupdate: "Could not update posts"})
					})
			})
		//TODO: change the avatars and comments
	})


//@desc Return current user
//@access Private
	app.get("/api/users/current", passport.authenticate("jwt", { session: false }), (req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email
		})
	})
}

module.exports = authRoutes