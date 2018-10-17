import React from "react"
import { connect } from "react-redux"

class SendMessageForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			roomLoaded: false,
			text: "",
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
		if(nextProps.currentRoom.id){
			this.setState({
				roomLoaded: true
			})
		}
	}

	handleOnChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
		this.props.userTyping()
	}

	handleOnSubmit = (event) => {
		event.preventDefault()
		const text = this.state.text
		this.props.sendMessage(text)
		this.setState({
			text: ""
		})
	}

	render(){
		const chatRoom = (
			<form onSubmit={this.handleOnSubmit}>
				<button 
					className="btn btn-success btn-md rounded-0"
					style={{float: "right", padding: "0.6rem 1.0rem"}} 
					><i className="fa fa-plus-circle"></i>
				</button>			
				<div style={{overflow: "hidden"}}>
					<input
						className="p-2"
						placeholder="Enter message"
						value={this.state.text}
						onChange={this.handleOnChange}
						name="text"
						error={this.state.errors.error}
						style={{border: "2.5px solid #9a9a9a", width: "100%"}}
					/>
				</div>
			</form>			
		)

		return(
			<div className="container">
				<div className="row">
					<div style={{width: "100%"}}>
						{ this.state.roomLoaded && chatRoom }
					</div>
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

export default connect(mapStateToProps)(SendMessageForm)