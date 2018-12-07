import React from "react"
import { connect } from "react-redux"


class Message extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		let currentUser = this.props.auth.user.id
		let sender = this.props.message.user
		return(
			<div 
				className={ currentUser == sender && "text-right" }
			>
				<span 
					className={ currentUser == sender ? "bg-primary text-light px-1 py-2 rounded" : "bg-dark text-light px-1 py-2 rounded"}
				>
					{this.props.message.text}
				</span>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Message)