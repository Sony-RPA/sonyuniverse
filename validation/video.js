const Validator = require("Validator")
const isEmpty = require("./is-empty")


const validateVideoInput = (data) => {
	let errors = {}

	data.urlPath = isEmpty(data.urlPath) ? "" : data.urlPath
	data.title = isEmpty(data.title) ? "" : data.title
	data.description = isEmpty(data.description) ? "" : data.description

	if(Validator.isEmpty(data.urlPath)){
		errors.urlPath = "Link is required"
	}

	if(!isEmpty(data.urlPath)){
		if(!Validator.isURL(data.urlPath)){
			errors.urlPath = "Link provided is not a valid URL"
		}
	}

	if(Validator.isEmpty(data.title)){
		errors.title = "Title is required"
	}

	if(!Validator.isLength(data.title, { min: 3, max: 40 })){
		errors.title = "Title must be between 3 and 40 characters."
	}

	if(Validator.isEmpty(data.description)){
		errors.description = "Description is required"
	}

	if(!Validator.isLength(data.description, { min: 3, max: 40 })){
		errors.description = "Description must be between 3 and 40 characters."
	}	

	return {
		errors: errors,
		isValid: isEmpty(errors)
	}

}

module.exports = validateVideoInput