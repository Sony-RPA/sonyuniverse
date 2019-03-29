import React from "react"
import { connect } from "react-redux"
import { updateNotification } from "../../actions/notificationActions"

class NotificationItem extends React.Component{
	constructor(props){
		super(props)
	}

	handleOnClick = (event) => {
		let {_id, seen} = this.props.notification
		if(!seen){
			this.props.updateNotification(_id)
		}
	}

	render(){
		let {avatar, description, seen} = this.props.notification
		return(
			<div
				onClick={this.handleOnClick}
				className="d-flex notification-wrapper" 
				style={ seen ? (
					{ width: "240px", whiteSpace: "normal", padding: "0.5rem" } 
					):( { width: "240px", whiteSpace: "normal", padding: "0.5rem", backgroundColor: "#d7e2f4" }
					)
				}
				>
				<div className="notification-avatar">
					<img src={avatar} style={{ width: "25px"}} className="mr-2 rounded-circle"/>
				</div>
				<div className="notification-desc">
					{description}
				</div>
				<div className="ml-auto">
					<span key={Math.random()}>
						<i className={seen ? "notification-check fa fa-check-circle text-success ml-1" : "hide-content"}></i>
					</span>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		updateNotification: (notificationId) => {
			dispatch(updateNotification(notificationId))
		}
	}
}

export default connect(null, mapDispatchToProps)(NotificationItem)
