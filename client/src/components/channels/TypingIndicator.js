import React from "react"

class TypingIndicator extends React.Component{
	render(){
		let users = this.props.usersWhoAreTyping
		if(users.length === 0){
			return <div/>
		} else if(users.length === 1){
			return <p className="text-muted p-0 ml-3">{users[0]} is typing...</p>
		} else if(users.length > 1){
			return <p className="text-muted p-0 ml-3">{users.join(" and ")} are typing...</p>
		}
	}
}

export default TypingIndicator