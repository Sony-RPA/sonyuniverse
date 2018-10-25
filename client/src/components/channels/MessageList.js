import React from "react"
import TypingIndicator from "./TypingIndicator"
import { connect } from "react-redux"

class MessageList extends React.Component{
	constructor(props){
		super(props)
		this.scrollToBottom = this.scrollToBottom.bind(this)
	}

	//create references for divs
	messagesEnd = React.createRef()
	messageList = React.createRef()

	componentWillUpdate(){
		if(this.messageList.current){
			//set a threshold for the bottom of the div
			this.distanceScrolled = this.messageList.current.scrollTop
			this.viewableHeight = this.messageList.current.clientHeight
			this.bottomThreshold = this.messageList.current.scrollHeight
			this.bottomThresholdMet = (
				this.distanceScrolled + this.viewableHeight + 200 > this.bottomThreshold
			)
		}
	}

	componentDidUpdate(prevProps){
		//scroll to bottom when component gets a new message and we are near the bottom
		if(this.messagesEnd.current){
			if(this.props.messages.length !== prevProps.messages.length && this.bottomThresholdMet){
				//give div time to scroll to the for the first update of the component
				setTimeout(() => {
					this.scrollToBottom()
				}, 100)
			}
		}
	}

	scrollToBottom = () => {
		this.messagesEnd.current.scrollIntoView({ behavior: "smooth", block: "nearest"})
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
					<div 
						style={{overflow: "scroll", overflowX: "hidden", maxHeight: "65vh"}}
						ref={this.messageList}
					>
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
						<div 
							style={{float: "left", clear: "both"}}
							ref={this.messagesEnd}>		
						</div>
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