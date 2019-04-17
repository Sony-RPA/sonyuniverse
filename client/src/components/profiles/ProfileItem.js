import React from "react"
import { Link } from "react-router-dom"
import isEmpty from "../../validation/is-empty"
import EndorseModal from "../endorse/EndorseModal"
import RemoveColleagueModal from "../disconnect/RemoveColleagueModal"
import SideDrawer from "../layout/SideDrawer"
import { connect } from "react-redux"
import { addColleague, acceptColleague, removeColleague, cancelConnectionRequest, declineConnectionRequest, whitelistColleague } from "../../actions/colleagueActions"
import { endorseColleague } from "../../actions/profileActions"
import { startConversation } from "../../actions/conversationActions"

class ProfileItem extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			endorseModalOpen: false,
			removeColleagueModalOpen: false,
			openDrawer: false,
			cancelButtonEnabled: false
		}

		this.handleRequestColleague = this.handleRequestColleague.bind(this)
		this.handleReceivedColleague = this.handleReceivedColleague.bind(this)
		this.handleRemoveColleague = this.handleRemoveColleague.bind(this)
		this.handleEndorseModalOpen = this.handleEndorseModalOpen.bind(this)
		this.handleRemoveColleagueModalOpen = this.handleRemoveColleagueModalOpen.bind(this)
		this.handleEndorseColleague = this.handleEndorseColleague.bind(this)
		this.handleStartConversation = this.handleStartConversation.bind(this)
		this.toggleDrawer = this.toggleDrawer.bind(this)
	}

	handleRequestColleague = (event) => {
		const requestedColleague = this.props.profile.user._id
		this.props.addColleague(requestedColleague)
	}

	handleReceivedColleague = (event) => {
		const receivedColleague = this.props.profile.user._id
		this.props.acceptColleague(receivedColleague)
	}

	handleRemoveColleague = (event) => {
		const removedColleague = this.props.profile.user._id
		this.props.removeColleague(removedColleague)
		this.setState((prevState) => {
			return{
				removeColleagueModalOpen: !prevState.removeColleagueModalOpen
			}
		})
	}

	handleDeclineConnectionRequest = (evemt) => {
		const declinedColleague = this.props.profile.user._id
		this.props.declineConnectionRequest(declinedColleague)
	}

	handleEndorseModalOpen = (event) => {
		this.setState((prevState) => {
			return{
				endorseModalOpen: !prevState.endorseModalOpen
			}
		})
	}

	handleRemoveColleagueModalOpen = (event) => {
		this.setState((prevState) => {
			return{
				removeColleagueModalOpen: !prevState.removeColleagueModalOpen
			}
		})
	}

	handleEndorseColleague = (colleagueId, skills) => {
		this.props.endorseColleague(colleagueId, skills)
		this.setState({
			endorseModalOpen: false
		})
	}

	handleStartConversation = (event) => {
		const userId = this.props.auth.user.id
		const colleagueId = this.props.profile.user._id
		const users = {
			users: [userId, colleagueId]
		}
		this.props.startConversation(users)
	}

	toggleDrawer = (event) => {
		this.setState((prevState) => {
			return{
				openDrawer: !prevState.openDrawer
			}
		})
	}

	onPendingButtonEnter = (event) => {
		this.setState({
			cancelButtonEnabled: true
		})
	}

	onCancelButtonLeave = (event) => {
		this.setState({
			cancelButtonEnabled: false
		})
	}

	handleCancelConnectionRequest = (event) => {
		const cancelledColleagueId = this.props.profile.user._id
		this.props.cancelConnectionRequest(cancelledColleagueId)
	}

	handleWhitelistColleague = (event) => {
		const whitelistColleagueId = this.props.profile.user._id
		this.props.whitelistColleague(whitelistColleagueId)
	}

	render(){
		const profile = this.props.profile
		const userHasProfile = this.props.userHasProfile
		const isAuthenticated = this.props.auth.isAuthenticated
		const userId = this.props.auth.user.id
		
		let colleagues = this.props.colleague
		let connected = colleagues.connected
		let requested = colleagues.requested
		let received = colleagues.received
		let denied = colleagues.denied

		let cancelButtonEnabled = this.state.cancelButtonEnabled

		let connectButton
		if(isAuthenticated &&
		 userId !== profile.user._id && 
		 !requested.includes(profile.user._id) && 
		 !received.includes(profile.user._id) && 
		 !connected.includes(profile.user._id) &&
		 !denied.includes(profile.user._id)){
		//display connect button
			connectButton = (
				<button  
					className="btn btn-success ml-2"
					onClick={this.handleRequestColleague}
				>
					Connect
				</button>
			)
		//display pending invitation button 
		} else if(isAuthenticated && requested.includes(profile.user._id)){
			connectButton = (
				<button 
					className="btn btn-outline-dark ml-2"
					onMouseEnter={this.onPendingButtonEnter}
					onMouseLeave={this.onCancelButtonLeave}
					onClick={this.handleCancelConnectionRequest}
					disabled={!this.state.cancelButtonEnabled}
				>
					{cancelButtonEnabled ? "Cancel" : "Pending"}
				</button>
			)
		//display accept invitation button
		} else if(isAuthenticated && received.includes(profile.user._id)){
			connectButton = (
				<div style={{display: "inline-block"}}>
					<button 
						className="btn btn-outline-success ml-2"
						onClick={this.handleReceivedColleague}
					>
						Accept <span key={Math.random()}><i className="fas fa-check-circle"></i></span>
					</button>
					<button
						className="btn btn-outline-secondary ml-2"
						onClick={this.handleDeclineConnectionRequest}
					>
						Decline <span key={Math.random()}><i className="fas fa-times-circle"></i></span>
					</button>
				</div>
			)
		//display messsage, endorse and delete button
		} else if(isAuthenticated && connected.includes(profile.user._id)){
			connectButton = (
				<div style={{display: "inline-block"}}>
					<button 
						className="btn btn-primary ml-2"
						onClick={() => {
							this.handleStartConversation()
							this.toggleDrawer()
						}}
					>
						<span key={Math.random()}><i className="fas fa-comments"></i></span>
					</button>
					<button 
						className="btn btn-success ml-2"
						onClick={this.handleEndorseModalOpen}
					>
						<span key={Math.random()}><i className="fas fa-chevron-circle-up"></i></span>
					</button>					
					<button 
						className="btn btn-danger ml-2"
						onClick={this.handleRemoveColleagueModalOpen}
					>
						<span key={Math.random()}><i className="fas fa-minus-circle"></i></span>
					</button>
				</div>
			)
		} else if(isAuthenticated && denied.includes(profile.user._id)){
			connectButton = (
				<button 
					className="btn btn-outline-secondary ml-2"
					onClick={this.handleWhitelistColleague}
				>
					Whitelist <span key={Math.random()}><i className="fas fa-angle-double-right"></i></span>
				</button>
			)
		}

		return(
			<div 
				className="profileItem card card-body bg-light mb-3 transition-med shadow"
			>
				<div className="row">
					<div className="col-2">
						<Link to={`/profile/${profile.handle}`}>
							<img 
								src={profile.user.avatar} 
								alt="" 
								className="rounded-circle d-none d-md-block avatar"
							/>
						</Link>
					</div>
					<div className="col-lg-6 col-md-4 col-8">
						<h3>{profile.user.name}</h3>
						<p>
							{profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}
						</p>
						<p>
							{isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}
						</p>
						<Link to={`/profile/${profile.handle}`} className="btn btn-info">
							View Profile
						</Link>
						{ userHasProfile && connectButton }

					</div>
					<div className="col-md-4 d-none d-md-block">
						<h4>Top Skills</h4>
						<ul className="list-group">
							{ profile.skills.slice(0, 4).map((skill, index) => (
								<li key={index} className="bg-black text-light border border-light list-group-item">
									<i className="fa fa-chevron-circle-up pr-1 mr-1 text-success"/>
									{skill.name}	
								</li>
							))}
						</ul>
					</div>
				</div>
				<EndorseModal 
					modalOpen={this.state.endorseModalOpen} 
					handleEndorseColleague={this.handleEndorseColleague}
					handleEndorseModalOpen={this.handleEndorseModalOpen}
					profile={profile}
				/>
				<RemoveColleagueModal
					modalOpen={this.state.removeColleagueModalOpen}
					handleRemoveColleagueModalOpen={this.handleRemoveColleagueModalOpen}
					handleRemoveColleague={this.handleRemoveColleague}
					profile={profile}
				/>
				<SideDrawer
					open={this.state.openDrawer}
					toggleDrawer={this.toggleDrawer}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		auth: state.auth,
		colleague: state.colleague
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		addColleague: (newColleagueId) => {
			dispatch(addColleague(newColleagueId))
		},
		acceptColleague: (receivedColleagueId) => {
			dispatch(acceptColleague(receivedColleagueId))
		},
		removeColleague: (removedColleagueId) => {
			dispatch(removeColleague(removedColleagueId))
		},
		endorseColleague: (colleagueId, skills) => {
			dispatch(endorseColleague(colleagueId, skills))
		},
		startConversation: (users) => {
			dispatch(startConversation(users))
		},
		cancelConnectionRequest: (cancelledColleagueId) => {
			dispatch(cancelConnectionRequest(cancelledColleagueId))
		},
		declineConnectionRequest: (declinedColleagueId) => {
			dispatch(declineConnectionRequest(declinedColleagueId))
		},
		whitelistColleague: (whitelistColleagueId) => {
			dispatch(whitelistColleague(whitelistColleagueId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem)