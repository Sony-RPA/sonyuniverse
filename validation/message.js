const Validator = require("validator")
const isEmpty = require("./is-empty")

const validateMessageInput = (data) => {
	let errors = {}
	data.text = isEmpty(data.text) ? "" : data.text

	if(Validator.isEmpty(data.text)){
		errors.text = "A message must have at least one character"
	}

	return{
		errors: errors,
		isValid: isEmpty(errors)
	}
}

module.exports = validateMessageInput