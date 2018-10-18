import React from "react"
import ReactDOM from "react-dom"
import TypingIndicator from "./TypingIndicator"

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
		const messages = this.props.messages
		let updatedMessages = []
		for(var i = 0; i < messages.length; i++){
			let previous = {}
			if(i > 0){
				previous = messages[i - 1]
			}
			if(messages[i].senderId === previous.senderId){
				updatedMessages.push({...messages[i], senderId: ""})
			} else{
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
											{message.senderId && (
												<span 
													className="text-dark d-block font-weight-bold mt-3"
												>
													{message.senderId}
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

export default MessageList