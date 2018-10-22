import React from "react"
import ReactDOM from "react-dom"
import TypingIndicator from "./TypingIndicator"
import { connect } from "react-redux"

class MessageList extends React.Component{

	componentWillUpdate(){
		const node = ReactDOM.findDOMNode(this)
		//scrollTop is the distance from the top. clientHeight is the visible height. scrollHeight is the height on the component
		this.shouldScrollToBottom = node.scrollTop + node.clientHeight >= node.scrollHeight
	}

	componentDidUpdate(){
		//scroll to the bottom if we are close to the bottom of the component
		if(this.shouldScrollToBottom){
			const node = ReactDOM.findDOMNode(this)
			node.scrollTop = node.scrollHeight
		}
	}

	render(){
		let users = this.props.chatkit.roomUsers
		let userIds = users.map((user) => {
			return user.id
		})
		let roomMessages = this.props.messages
		let messages = []
		for(var i = 0; i < roomMessages.length; i++){
			//create a new field to give each message a unique id
			roomMessages[i].unique = roomMessages[i].senderId
			let previous = {}
			if(i > 0){
				previous = roomMessages[i - 1]
			}
			let roomMessage = roomMessages[i]
			if(roomMessages[i].senderId === previous.senderId && roomMessages[i].unique === previous.unique){
				messages.push({...roomMessage, unique: ""})
			} else{
				messages.push({...roomMessage})
			}
		}
		let updatedMessages = []
		for(var i = 0; i < messages.length; i++){
			let matchingIdIndex = userIds.indexOf(messages[i].unique)
			if(matchingIdIndex >= 0 && messages[i].unique != ""){
				messages[i].unique = users[matchingIdIndex].name
				updatedMessages.push(messages[i])
			} else {
				updatedMessages.push(messages[i])
			}
		}

		return(
			<div>
				{this.props.room && (
					<div style={{overflow: "scroll", overflowX: "hidden", maxHeight: "65vh"}}>
						<ul style={{listStyle: "none"}} className="p-3">
							{updatedMessages.map((message, index) => {
								return (
									<li className="mb-1" key={index}>
										<div>
											{message.unique && (
												<span 
													className="text-dark d-block font-weight-bold mt-3"
												>
													{message.unique}
												</span>
											)}
											<span 
												className="bg-info text-light rounded d-inline-block"
												style={{padding:".25rem .5rem"}}
											>
												{message.text}
											</span>
										</div>
									</li>
								)
							})}
						</ul>
						<TypingIndicator usersWhoAreTyping={this.props.usersWhoAreTyping}/>
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		chatkit: state.chatkit
	}
}

export default connect(mapStateToProps)(MessageList)