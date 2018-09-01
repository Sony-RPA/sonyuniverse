const mongoose = require("mongoose")
const User = require("../models/User")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const keys = require("./keys")

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.secretOrKey

const passportAuthenticate = (passport) => {
	passport.use(new JwtStrategy(options, (jwt_payload, done) => {
		User.findById(jwt_payload.id)
			.then(foundUser => {
				if(foundUser){
					return done(null, foundUser)
				}
				return done(null, false)
			})
			.catch(err => console.log(err))
	}))
}

module.exports = passportAuthenticate
