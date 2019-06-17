import React from "react"

//destructure props to get the properties you need
const TextFieldGroup = ({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
  autocomplete,
	disabled,
  additionalClass
}) => {
	return(
    <div className="form-group">
      <input 
      	type={type} 
      	className={ error ? `${additionalClass} form-control form-control-lg is-invalid` : `${additionalClass} form-control form-control-lg` } 
      	placeholder={placeholder} 
      	name={name} 
      	value={value}
      	onChange={onChange}
        autoComplete={autocomplete}
      	disabled={disabled}
      />
      { info && <small className="form-text text-muted">{info}</small> }
      { error && <div className="invalid-feedback text-left">{error}</div>}
    </div>
	)
}

TextFieldGroup.defaultProps = {
	type: "text"
}

export default TextFieldGroup