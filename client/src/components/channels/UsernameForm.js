import React from "react"
import InputGroup from "../common/InputGroup"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { createChatkitUser } from "../../actions/chatkitActions"

class UsernameForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: "",
			errors: {}
		}

		this.handleOnChange = this.handleOnChange.bind(this)
		this.handleOnSubmit = this.handleOnSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			})
		}
	}

	handleOnChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleOnSubmit = (event) => {
		event.preventDefault()
		const userData = {
			username: this.state.username
		}
		this.props.createChatkitUser(userData, this.props.history)
	}

	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-4">
						<form onSubmit={this.handleOnSubmit}>
							<InputGroup
								placeholder="Create a username for the chat"
								value={this.state.username}
								onChange={this.handleOnChange}
								name="username"
								error={this.state.errors.error}
							/>
							<button className="su-button" style={{background: "#17a2b8"}}>Submit</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		chatkit: state.chatkit,
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		createChatkitUser: (username, history) => {
			dispatch(createChatkitUser(username, history))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UsernameForm))