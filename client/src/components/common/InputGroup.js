import React from "react"

//destructure props to get the properties you need
const InputGroup = ({
	name,
	placeholder,
	value,
	error,
  icon,
  type,
	onChange,
  disabled
}) => {
	return(
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon}/>
        </span>
      </div>
      <input 
      	className={ error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg" } 
      	placeholder={placeholder} 
      	name={name} 
      	value={value}
      	onChange={onChange}
        disabled={disabled}
      />
      { error && <div className="invalid-feedback">{error}</div>}
    </div>
	)
}

InputGroup.defaultProps = {
  type: "text"
}

export default InputGroup