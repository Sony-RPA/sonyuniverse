import React from "react"
import TextFieldGroup from "../common/TextFieldGroup"
import { connect } from "react-redux"
import { createMessage } from "../../actions/conversationActions"

class MessageForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			text: "",
			errors: {}
		}
		this.onChange = this.onChange.bind(this)
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

		const conversationId = this.props.conversation._id
		const messageData = {
			user: this.props.auth.user.id,
			text: this.state.text,
			name: this.props.auth.user.name,
			avatar: this.props.auth.user.avatar
		}
		this.props.createMessage(conversationId, messageData)

		this.setState({
			text: ""
		})
	}

	render(){
		const errors = this.state.errors
		return(
			<div>
				<form onSubmit={this.onSubmit}>
					<TextFieldGroup
						placeholder="Type message"
						name="text"
						value={this.state.text}
						onChange={this.onChange}
						error={errors.text}
					/>
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		auth: state.auth,
		conversation: state.conversation,
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		createMessage: (conversationId, messageData) => {
			dispatch(createMessage(conversationId, messageData))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)