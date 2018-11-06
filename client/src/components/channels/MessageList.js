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
			//create a new field to give each message the avatar from that user
			let matchingUserIndex = userIds.indexOf(roomMessages[i].senderId)
			if(matchingUserIndex >= 0){
				roomMessages[i].avatar = users[matchingUserIndex].avatar
			}

			//review messages
			let previous = {}
			if(i > 0){
				previous = roomMessages[i - 1]
			}
			let roomMessage = roomMessages[i]
			//check if consecutive messages are made by the same user
			if(roomMessages[i].senderId === previous.senderId && roomMessages[i].unique === previous.unique){
				//display user name and avatar as an empty string
				messages.push({...roomMessage, unique: "", avatar: ""})
			} else{
				//display the user name
				messages.push({...roomMessage})
			}
		}
		let updatedMessages = []
		for(var j = 0; j < messages.length; j++){
			let matchingIdIndex = userIds.indexOf(messages[j].unique)
			if(matchingIdIndex >= 0 && messages[j].unique !== ""){
				messages[j].unique = users[matchingIdIndex].name
				updatedMessages.push(messages[j])
			} else {
				updatedMessages.push(messages[j])
			}
		}

		let currentChatkitUser = this.props.chatkit.chatUser.id

		return(
			<div>
				{this.props.room && (
					<div 
						style={{overflow: "scroll", overflowX: "hidden", maxHeight: "70vh"}}
						ref={this.messageList}
					>
						<ul style={{listStyle: "none"}} className="p-4 mb-0">
							{updatedMessages.map((message, index) => {
								return (
									<li 
										className="mb-1"
										key={index}>
										<div>
											{message.unique && (
												<span 
													className="d-block font-weight-bold mt-3"
													style={{color: "#000323"}}
												>
													<img 
														src={message.avatar} 
														style={{width: "2.5rem"}}
														className="rounded-circle mr-2"
													/>
													{message.unique}
												</span>
											)}
											<span 
												className={message.senderId === currentChatkitUser ? 
													"muted-blue text-light rounded d-inline-block ml-5" : "bg-secondary text-light rounded d-inline-block ml-5"	
												}
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