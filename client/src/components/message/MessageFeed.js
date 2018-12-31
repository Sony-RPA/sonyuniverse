import React from "react"
import Message from "./Message"
import { connect } from "react-redux"

class MessageFeed extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			messages: []
		}
	}

	componentDidMount(){
		this.setState({
			messages: this.props.conversation.messages
		})
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.conversation){
			this.setState({
				messages: nextProps.conversation.messages
			})
		}
	}

	render(){
		let messages
		if(!this.state.messages){
			messages = []
		} else {
			messages = this.state.messages
		}

		return(
			<div>
				<div className="px-2 py-3">
					{ messages.map((message) => {
						return(
							<div 
								className="mb-3"
								key={message._id}>
									<Message message={message}/>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		conversation: state.conversation
	}
}

export default connect(mapStateToProps)(MessageFeed)