const Validator = require("validator")
const isEmpty = require("./is-empty")

const validateAvatarInput = (data) => {
	let errors = {}

	data.avatar = isEmpty(data.avatar) ? "" : data.avatar

	if(Validator.isEmpty(data.avatar)){
		errors.avatar = "An image url is required"
	}

	return{
		errors: errors,
		isValid: isEmpty(errors)
	}
}

module.exports = validateAvatarInput