import React from "react"
import { connect } from "react-redux"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import SelectListGroup from "../common/SelectListGroup"
import InputGroup from "../common/InputGroup"
import { withRouter } from "react-router-dom"
import {createProfile} from "../../actions/profileActions"

class CreateProfile extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			displaySocialInputs: false,
			handle: "",
			company: "",
			website: "",
			location: "",
			status: "",
			skills: "",
			githubusername: "",
			bio: "",
			twitter: "",
			facebook: "",
			linkedin: "",
			youtube: "",
			instagram: "",
			errors: {}
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			})
		}
	}

	onSubmit = (event) => {
		event.preventDefault()

		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram			
		}

		this.props.createProfile(profileData, this.props.history)
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	render(){
		const errors = this.state.errors
		const displaySocialInputs = this.state.displaySocialInputs
		let socialInputs;

		if(displaySocialInputs){
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder="Facebook Page URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="LinkedIn Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
					<InputGroup
						placeholder="Youtube Channel URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					<InputGroup
						placeholder="Instagram Page URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>																			
			)
		}
		//select options for status
		const options = [
			{ label: "* Select Professional Status", value: 0 },
			{ label: "Developer", value: "Developer" },
			{ label: "Finance", value: "Finance" },
			{ label: "Accounting", value: "Accounting" },
			{ label: "Manager", value: "Manager" },
			{ label: "Director", value: "Director" },
			{ label: "Marketing", value: "Marketing" },
			{ label: "Sales", value: "Sales" },
			{ label: "HR", value: "HR" },
			{ label: "Operations", value: "Operations" },
			{ label: "Support", value: "Support" },
			{ label: "Designer", value: "Designer" },
			{ label: "Other", value: "Other" }
		]
		return(
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<div style={{fontFamily: "Montserrat"}}>
								<h1 className="display-4 text-center">Create Your Profile</h1>
								<p className="lead text-center">Let's get some information to make your profile stand out</p>
							</div>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nickname"
								/>
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									options={options}
									error={errors.status}
									info="Give us an idea of where you are at in your career"
								/>
								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="Could be your own company or where you work"
								/>
								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Provide your website if you have one"
								/>
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="City or city & state suggested (eg. Los Angeles, CA)"
								/>
								<TextFieldGroup
									placeholder="* Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info="Please use comma separated values (eg. HTML, CSS, JavaScript)"
								/>		
								<TextFieldGroup
									placeholder="Github Username"
									name="githubusername"
									value={this.state.githubusername}
									onChange={this.onChange}
									error={errors.githubusername}
									info="If you want your latest repos and a Github link, include your username"
								/>
								<TextAreaFieldGroup
									placeholder="Short Bio"
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell us a little about yourself"
								/>
								<div className="mb-3">
									<button
										type="button"
										className="btn btn-info"
										onClick={() => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}))
										}}
									>
										Add Social Network
									</button>
									<small 
										className="text-muted"
										style={{marginLeft: "5px"}}
									>
										Optional
									</small>
								</div>
								{socialInputs}
								<input 
									type="submit" value="Submit" 
									className="btn btn-info btn-block mt-4"
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
		createProfile: (profileData, history) => {
			dispatch(createProfile(profileData, history))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateProfile))