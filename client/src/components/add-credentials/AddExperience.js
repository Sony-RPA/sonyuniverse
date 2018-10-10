import React from "react"
import { Link, withRouter } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import { connect } from "react-redux"
import { addExperience } from "../../actions/profileActions"


class AddExperience extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			company: "",
			title: "",
			location: "",
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
		const expData = {
			company: this.state.company,
			title: this.state.title,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		}

		this.props.addExperience(expData, this.props.history)
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
			<div className="add-experience" style={{fontFamily: "Montserrat"}}>
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-secondary mb-3">
								Go Back
							</Link>
							<div>
								<h2 className="bg-black text-light p-2 text-center shadow">Add Experience</h2>
								<p className="lead text-center">Tell us about your favorite job experiences</p>
							</div>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
								/>
								<TextFieldGroup
									placeholder="* Job Title"
									name="title"
									value={this.state.title}
									onChange={this.onChange}
									error={errors.title}
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
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
										Current Job
									</label>
								</div>
								<TextAreaFieldGroup
									placeholder="Job Description"
									name="description"
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
									info="Tell us about the position"
								/>
								<input 
									type="submit" 
									value="Submit" 
									className="su-button" style={{background: "#17a2b8"}}
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
		addExperience: (expData, history) => {
			dispatch(addExperience(expData, history))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddExperience))