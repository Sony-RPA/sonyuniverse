import React from "react"
import { connect } from "react-redux"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import SelectListGroup from "../common/SelectListGroup"
import InputGroup from "../common/InputGroup"
import { Link, withRouter } from "react-router-dom"
import isEmpty from "../../validation/is-empty"
import {createProfile, getCurrentProfile} from "../../actions/profileActions"

class EditProfile extends React.Component{
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

	componentDidMount(){
		this.props.getCurrentProfile()
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			})
		}

		if(nextProps.profile.profile){
			const profile = nextProps.profile.profile
			//get an array of all the skill names
			const skillsArray = profile.skills.map((skill) => {
				return skill.name
			})
			//Bring skills array back to comma separated values
			const skillsCSV = skillsArray.join(",")

			//if profile field doesnt exist, make empty strng
			profile.company = !isEmpty(profile.company) ? profile.company : ""
			profile.website = !isEmpty(profile.website) ? profile.website : ""
			profile.location = !isEmpty(profile.location) ? profile.location : ""
			profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ""
			profile.bio = !isEmpty(profile.bio) ? profile.bio : ""
			profile.social = !isEmpty(profile.social) ? profile.social : {}
			profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ""
			profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ""
			profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ""
			profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ""
			profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ""

			//set component state fields
			this.setState({
				handle: profile.handle,
				company: profile.company,
				website: profile.website,
				location: profile.location,
				status: profile.status,
				skills: skillsCSV,
				githubusername: profile.githubusername,
				bio: profile.bio,
				twitter: profile.twitter,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				youtube: profile.youtube,
				instagram: profile.instagram			
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
			{ label: "Engineering", value: "Engineering" },
			{ label: "Finance", value: "Finance" },
			{ label: "Accounting", value: "Accounting" },
			{ label: "Management", value: "Management" },
			{ label: "Coordination", value: "Coordination" },
			{ label: "Marketing", value: "Marketing" },
			{ label: "Sales", value: "Sales" },
			{ label: "Human Resources", value: "Human Resources" },
			{ label: "Recruiting", value: "Recruiting" },
			{ label: "Operations", value: "Operations" },
			{ label: "Support", value: "Support" },
			{ label: "Design", value: "Design" },
			{ label: "Product", value: "Product" }
		]
		
		return(
			<div className="create-profile" style={{fontFamily: "Montserrat"}}>
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-secondary mb-3">
								Go Back
							</Link>						
							<h2 
								className="bg-black text-light text-center mb-4 p-2 shadow"
							>
								Edit Your Profile
							</h2>
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
										className="btn btn-success"
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
									className="btn btn-info btn-block rounded-0 mt-4"
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
		},
		getCurrentProfile: () => {
			dispatch(getCurrentProfile())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile))