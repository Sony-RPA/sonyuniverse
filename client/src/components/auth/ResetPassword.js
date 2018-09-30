import React from "react"
import InputGroup from "../common/InputGroup"
import { connect } from "react-redux"
import { createHash } from "../../actions/authActions"

class ResetPassword extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			email: "",
			resetRequested: false,
			errors: {}
		}

		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.handleValidSubmit = this.handleValidSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.auth.isPasswordReset){
			this.setState({
				resetRequested: nextProps.auth.isPasswordReset
			})
		}
		if(nextProps.errors.error){
			this.setState({
				resetRequested: false,
				errors: nextProps.errors
			})
		}
	}

	//update state as email value changes
	handleEmailChange = (event) => {
		this.setState({
			email: event.target.value
		})
	}

	//catch enter clicks
	handleKeyPress = (target) => {
		if(target.charCode === 13){
			this.handleValidSubmit()
		}
	}

	//handle submision once all form data is valid
	handleValidSubmit = (event) => {
		event.preventDefault()
		const userEmail = {
			email: this.state.email
		}
		this.props.createHash(userEmail)
	}

	render(){
		const resetRequested = this.state.resetRequested
		const errors = this.state.errors
		return(
			<div className="mt-5 row justify-content-center">
				<div className="col-10 col-sm-7 col-md-5 col-lg-4">
					{ resetRequested ? (
						<p className="bg-success p-3 text-light text-center rounded">
							Great! An email to reset your password has been sent to this address.
						</p>
						) : (
							<p className="bg-dark p-3 text-light text-center rounded"> 
								To reset your password, please enter your email below 
								and a link will be sent to you.
							</p>
						)
					}

					<form onSubmit={this.handleValidSubmit}>
							<InputGroup
								name="email"
								onChange={this.handleEmailChange}
								onKeyPress={this.handleKeyPress}
								placeholder="tonystark@sony.com"
								required
								type="email"
								value={this.state.email}
								error={errors.error}
							/>
						<button className="btn btn-info btn-md btn-block mt-4">Reset Password</button>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		auth: state.auth,
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		createHash: (email) => {
			dispatch(createHash(email))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)