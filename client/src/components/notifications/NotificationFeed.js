import React from "react"
import { connect } from "react-redux"
import NotificationItem from "./NotificationItem"

class NotificationFeed extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			opened: false
		}
	}

	componentDidMount(){
		window.addEventListener("click", this.checkDropdownStatus)
	}

	componentWillUnmount(){
		window.removeEventListener("click", this.checkDropdownStatus)
	}

	checkDropdownStatus = (event) => {
		let showDropdown = this.props.showDropdown
		let opened = this.state.opened
		//on mount, the dropdown should be closed
		if(showDropdown && !opened){
			//confirm that the dropdown is open
			this.setState({
				opened: true
			})
		//if dropdown is viewable and open
		} else if(showDropdown && opened){
			//close and hide dropdown
			this.props.toggleDropdown()
			this.setState({
				opened: false
			})
		//if dropdown is hidden but still open
		} else if(!showDropdown && opened){
			//close dropdown
			this.setState({
				opened: false
			})
		}
	}

	render(){
		let notifications = this.props.notification.notifications
		let showDropdown = this.props.showDropdown
		return(
			<div>
				<div className={showDropdown ? "arrow-up" : "hide-content"}></div>
	      		<div className={showDropdown ? "dropdown-content" : "hide-content"}>
	      			{notifications.map((notification, index) => {
	      				return(
	      					<div key={index}>
	      						<NotificationItem notification={notification}/>
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
		notification: state.notification
	}
}

export default connect(mapStateToProps)(NotificationFeed)
