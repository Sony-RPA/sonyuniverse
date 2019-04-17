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

	componentDidUpdate(prevProps){
		if(this.props.errors && this.props.errors !== prevProps.errors){
			this.setState({
				errors: this.props.errors
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
			text: "",
			errors: {}
		})
	}

	render(){
		const { errors } = this.state

		return(
			<div>
				<form onSubmit={this.onSubmit}>
					<TextFieldGroup
						placeholder="Type message"
						name="text"
						value={this.state.text}
						onChange={this.onChange}
						autocomplete="off"
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