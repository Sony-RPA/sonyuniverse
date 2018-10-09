import React from "react"
import { Link, withRouter } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import { connect } from "react-redux"
import { addEducation } from "../../actions/profileActions"


class AddEducation extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			school: "",
			degree: "",
			fieldofstudy: "",
			from: "",
			to: "",
			current: false,
			description: "",
			errors: {},
			disabled: false
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.onCheck = this.onCheck.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			})
		}
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	onSubmit = (event) => {
		event.preventDefault()
		const eduData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		}

		this.props.addEducation(eduData, this.props.history)
	}

	onCheck = (event) => {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		})
	}

	render(){
		const errors = this.state.errors
		return(
			<div className="add-education" style={{fontFamily: "Montserrat"}}>
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-secondary mb-3">
								Go Back
							</Link>
							<div>
								<h2 className="bg-black text-light p-2 text-center shadow">Add Education</h2>
								<p className="lead text-center">Add any school or program that you have attended</p>
							</div>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* School"
									name="school"
									value={this.state.school}
									onChange={this.onChange}
									error={errors.school}
								/>
								<TextFieldGroup
									placeholder="* Degree or Certification"
									name="degree"
									value={this.state.degree}
									onChange={this.onChange}
									error={errors.degree}
								/>
								<TextFieldGroup
									placeholder="* Field of study"
									name="fieldofstudy"
									value={this.state.fieldofstudy}
									onChange={this.onChange}
									error={errors.fieldofstudy}
								/>
								<h6>From Date</h6>
								<TextFieldGroup
									type="date"
									name="from"
									value={this.state.from}
									onChange={this.onChange}
									error={errors.from}
								/>
								<h6>To Date</h6>
								<TextFieldGroup
									type="date"
									name="to"
									value={this.state.to}
									onChange={this.onChange}
									error={errors.to}
									disabled={this.state.disabled ? "disabled": ""}
								/>
								<div className="form-check mb-4">
									<input 
										type="checkbox"
										className="form-check-input"
										name="current"
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
										id="current"
									/>
									<label htmlFor="current" className="form-check-label">
										Current Study
									</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Program Description"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
									info="Tell us about the program field you were in"
								/>
								<input 
									type="submit" 
									value="Submit" 
									className="btn btn-info btn-block mt-4 rounded-0"
								/>																																	
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		profile: state.profile,
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		addEducation: (expData, history) => {
			dispatch(addEducation(expData, history))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEducation))