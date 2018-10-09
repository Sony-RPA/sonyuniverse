import React from "react"
import { Link } from "react-router-dom"
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

		this.props.updateAvatar(newAvatar)
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
			<div className="update-avatar" style={{fontFamily: "Montserrat", height: "80vh"}}>
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/dashboard" className="btn btn-secondary mb-3">
								Go Back
							</Link>
							<h2 className="bg-black text-light p-2 text-center shadow">
								Update your Avatar
							</h2>
							<div className="text-center mt-4 mb-4">
								<img 
									src={currentAvatar}
									className="rounded-circle"
									style={{height: "200px", width: "200px"}}
								/>
							</div>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="* URL - https://i.imgur.com/FRK6meX.png"
									name="avatar"
									value={this.state.avatar}
									onChange={this.onChange}
									error={errors.avatar}
									info="Use images with equal dimensions (200 x 200) for best quality" 
								/>
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
		auth: state.auth,
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		updateAvatar: (avatar) => {
			dispatch(updateAvatar(avatar))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAvatar)