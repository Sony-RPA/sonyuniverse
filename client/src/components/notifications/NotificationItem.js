import React from "react"
import { connect } from "react-redux"
import { getNotifications, updateNotification } from "../../actions/notificationActions"
import { acceptColleague, declineConnectionRequest } from "../../actions/colleagueActions"

class NotificationItem extends React.Component{
	constructor(props){
		super(props)
	}

	handleNotificationClick = (event) => {
		let {_id, seen, actionRequired} = this.props.notification
		if(!seen && !actionRequired){
			this.props.updateNotification(_id)
		}
	}

	handleAcceptColleague = (event) => {
		let { senderId } = this.props.notification

		//accept request
		this.props.acceptColleague(senderId)
	}

	handleDeclineConnectionRequest = (event) => {
		let { senderId } = this.props.notification

		//decline request
		this.props.declineConnectionRequest(senderId)
	}

	render(){
		let {avatar, description, seen, category, actionRequired} = this.props.notification
		return(
			<div
				style={ seen ? (
					{ width: "240px", whiteSpace: "normal", padding: "0.5rem" } 
					):( { width: "240px", whiteSpace: "normal", padding: "0.5rem", backgroundColor: "#d7e2f4" }
					)
				}
			>
				<div
					onClick={this.handleNotificationClick}
					className="d-flex notification-wrapper" 
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
				{ actionRequired && category == "connection-request" ? (
					<div className="mt-2 text-center">
						<button 
							className="btn btn-sm btn-success ml-1 mr-1"
							onClick={this.handleAcceptColleague}
						>
							Accept
						</button>
						<button 
							className="btn btn-sm btn-secondary ml-1 mr-1"
							onClick={this.handleDeclineConnectionRequest}
						>	
							Decline
						</button>
					</div>
				) : (
					null
				)}
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		updateNotification: (notificationId) => {
			dispatch(updateNotification(notificationId))
		},
		acceptColleague: (receivedColleagueId) => {
			dispatch(acceptColleague(receivedColleagueId))
		},
		getNotifications: () => {
			dispatch(getNotifications())
		},
		declineConnectionRequest: (declinedColleagueId) => {
			dispatch(declineConnectionRequest(declinedColleagueId))
		}
	}
}

export default connect(null, mapDispatchToProps)(NotificationItem)
