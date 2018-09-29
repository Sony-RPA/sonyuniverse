const Validator = require("validator")
const isEmpty = require("./is-empty")

const validateChangePasswordInput = (data) => {
	let errors = {}
	data.password = isEmpty(data.password) ? "" : data.password
	data.confirmPassword = isEmpty(data.confirmPassword) ? "" : data.confirmPassword

	if(Validator.isEmpty(data.password)){
		errors.password = "Password field is required"
	}

	if(!Validator.isLength(data.password, { min: 8})){
		errors.password = "Passwords must be at least 8 characters"
	}

	if(Validator.isEmpty(data.confirmPassword)){
		errors.confirmPassword = "Conifrm password field is required"
	}

	if(!Validator.equals(data.password, data.confirmPassword)){
		errors.confirmPassword = "Passwords must match"
	}

	return{
		errors: errors,
		isValid: isEmpty(errors)
	}
}

module.exports = validateChangePasswordInput