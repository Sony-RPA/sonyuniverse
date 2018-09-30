import React from "react"
import TextFieldGroup from "../common/TextFieldGroup"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { changePassword } from "../../actions/authActions"

class ChangePassword extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			password: "",
			confirmPassword: "",
			errors: {}
		}

		this.onChange = this.onChange.bind(this)
		this.onKeyPress = this.onKeyPress.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
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

	onKeyPress = (target) => {
		if(target.charCode === 13){
			target.preventDefault()
			this.onSubmit()
		}
	}

	onSubmit = (event) => {
		event.preventDefault()
		let hash = this.props.match.params.hash
		if(hash.includes("target=")){
			hash = hash.substr(0, hash.indexOf('"'))
		}

		const passwordData = {
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			hash: hash
		}
		this.props.changePassword(passwordData, this.props.history)
	}

	render(){
		const errors = this.state.errors
		const headerMessage = errors.couldnotupdate ? (
			<p className="bg-warning p-3 text-center rounded">
				{errors.couldnotupdate}
			</p>
			) : (
				<p className="bg-dark p-3 text-light text-center rounded">
					Please enter and confirm a new password to update
					your credentials.
				</p>			
			)

		return(
			<div className="mt-5 row justify-content-center">
				<div className="col-10 col-sm-7 col-md-5 col-lg-4">
					{ headerMessage }
					<form onSubmit={this.onSubmit}>
						<TextFieldGroup
							name="password"
							onChange={this.onChange}
							onKeyPress={this.onKeyPress}
							placeholder="Password"
							required
							type="password"
							value={this.state.password}
							error={errors.password}
						/>
						<TextFieldGroup
							name="confirmPassword"
							onChange={this.onChange}
							onKeyPress={this.onKeyPress}
							placeholder="Re-enter your new password"
							required
							type="password"
							value={this.state.confirmPassword}
							error={errors.confirmPassword}
						/>
						<input type="submit" className="btn btn-success btn-block mt-4"/>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		changePassword: (passwordData, history) => {
			dispatch(changePassword(passwordData, history))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePassword))