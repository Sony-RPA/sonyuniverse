import React from "react"

//destructure props to get the properties you need
const TextAreaFieldGroup = ({
	name,
	placeholder,
	value,
	error,
  errorProfile,
	info,
	onChange
}) => {
	return(
    <div className="form-group">
      <textarea 
      	className={ error || errorProfile ? "form-control form-control-lg is-invalid" : "form-control form-control-lg" } 
      	placeholder={placeholder} 
      	name={name} 
      	value={value}
      	onChange={onChange}
      />
      { info && <small className="form-text text-muted">{info}</small> }
      { error && <div className="invalid-feedback">{error}</div>}
      { errorProfile && <div className="invalid-feedback">{errorProfile}</div>}
    </div>
	)
}

export default TextAreaFieldGroup