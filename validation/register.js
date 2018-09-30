const Validator = require("validator")
const isEmpty = require("./is-empty")

const validateRegisterInput = (data) => {
	let errors = {}
	const validEmailDomains = ["sony.com", "spe.sony.com", "playstation.com"]

	data.name = isEmpty(data.name) ? "" : data.name
	data.email = isEmpty(data.email) ? "" : data.email
	data.password = isEmpty(data.password) ? "" : data.password
	data.password2 = isEmpty(data.password2) ? "" : data.password2

	if(!Validator.isLength(data.name, { min: 2, max: 30 })){
		errors.name = "Name must be between 2 and 30 characters"
	}

	if(Validator.isEmpty(data.name)){
		errors.name = "Name field is required"
	}

	if(Validator.isEmpty(data.email)){
		errors.email = "Email field is required"
	}

	if(!Validator.isEmail(data.email)){
		errors.email = "Email is invalid"
	}

	//extract email domain from user email
	const emailDomain = data.email.slice(data.email.indexOf("@") + 1)

	//check if the email domain is acceptable in our array
	if(!validEmailDomains.includes(emailDomain)){
		errors.email = "You must use your Sony email to create an account"
	}
	
	if(Validator.isEmpty(data.password)){
		errors.password = "Password field is required"
	}

	if(!Validator.isLength(data.password, { min: 8, max: 30 })){
		errors.password = "Password must be at least 8 characters"
	}

	if(Validator.isEmpty(data.password2)){
		errors.password2 = "Confirm password field is required"
	}

	if(!Validator.equals(data.password, data.password2)){
		errors.password2 = "Passwords must match"
	}

	return {
		errors: errors,
		isValid: isEmpty(errors)
	}
}

module.exports = validateRegisterInput