const User = require("../../models/User")
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")
const passport = require("passport")

//Load input validation
const validateRegisterInput = require("../../validation/register")
const validateLoginInput = require("../../validation/login")

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
					//generate a gravatar
					const avatar = gravatar.url(req.body.email, {
						s: "200", //Size 
						r: "pg", //Rating
						d: "nm" //Default
					})

					//create user
					const newUser = new User({
						name: req.body.name,
						email: req.body.email,
						avatar: avatar,
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
								})
								.catch((err) => {
									console.log(err)
								})
						})
					})
				}
			})
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