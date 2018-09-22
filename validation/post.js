const Validator = require("validator")
const isEmpty = require("./is-empty")

const validatePostInput = (data) => {
	let errors = {}

	data.text = isEmpty(data.text) ? "" : data.text

	if(!Validator.isLength(data.text, { min: 2, max: 500})){
		errors.text = "Post must be between 2 and 500 characters"
	}

	if(Validator.isEmpty(data.text)){
		errors.text = "Text field is required"
	}

	return {
		errors: errors,
		isValid: isEmpty(errors)
	}
}

module.exports = validatePostInput