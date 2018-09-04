import React from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import TextFieldGroup from "../common/TextFieldGroup"
import { updateAvatar } from "../../actions/authActions"

class EditAvatar extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			avatar: "",
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

		const newAvatar = {
			avatar: this.state.avatar
		}

		this.props.updateAvatar(newAvatar, this.props.history)
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render(){
		const errors = this.state.errors
		const currentAvatar = this.props.auth.user.avatar
		return(
			<div className="update-avatar">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-secondary">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Update your Avatar</h1>
							<div className="text-center mt-4 mb-4">
								<img 
									src={currentAvatar}
									className="rounded-circle"
									style={{maxWidth: "200px"}}
								/>
							</div>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* Image URL"
									name="avatar"
									value={this.state.avatar}
									onChange={this.onChange}
									error={errors.avatar}
									info="Provide a url: https://dxf1.com/images/jdownloads/screenshots/sony.png"
								/>
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
		auth: state.auth,
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		updateAvatar: (avatar, history) => {
			dispatch(updateAvatar(avatar, history))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditAvatar))