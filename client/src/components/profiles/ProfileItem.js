import React from "react"
import { Link } from "react-router-dom"
import isEmpty from "../../validation/is-empty"
import EndorseModal from "../endorse/EndorseModal"
import { connect } from "react-redux"
import { addColleague, acceptColleague, removeColleague } from "../../actions/colleagueActions"

class ProfileItem extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			modalOpen: false
		}

		this.handleRequestColleague = this.handleRequestColleague.bind(this)
		this.handleReceivedColleague = this.handleReceivedColleague.bind(this)
		this.handleRemoveColleague = this.handleRemoveColleague.bind(this)
		this.handleModalOpen = this.handleModalOpen.bind(this)
		this.handleEndorseColleague = this.handleEndorseColleague.bind(this)
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
	}

	handleModalOpen = (event) => {
		this.setState({
			modalOpen: true
		})
	}

	handleEndorseColleague = (event) => {


		this.setState({
			modalOpen: false
		})
	}

	render(){
		const profile = this.props.profile
		const isAuthenticated = this.props.auth.isAuthenticated
		const userId = this.props.auth.user.id
		
		let colleagues = this.props.colleague
		let connected = colleagues.connected
		let requested = colleagues.requested
		let received = colleagues.received
		let denied = colleagues.denied

		let connectButton
		if(isAuthenticated &&
		 userId !== profile.user._id && 
		 !requested.includes(profile.user._id) && 
		 !received.includes(profile.user._id) && 
		 !connected.includes(profile.user._id)){
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
				<button className="btn btn-outline-dark ml-2" disabled>
					Pending
				</button>
			)
		//display accept invitation button
		} else if(isAuthenticated && received.includes(profile.user._id)){
			connectButton = (
				<button 
					className="btn btn-outline-success ml-2"
					onClick={this.handleReceivedColleague}
				>
					Accept <i className="fas fa-check-circle"></i>
				</button>
			)
		//display messsage, endorse and delete button
		} else if(isAuthenticated && connected.includes(profile.user._id)){
			connectButton = (
				<div style={{display: "inline-block"}}>
					<button className="btn btn-primary ml-2">
						<i className="fas fa-comments"></i>
					</button>
					<button 
						className="btn btn-success ml-2"
						onClick={this.handleModalOpen}
					>
						<i className="fas fa-chevron-circle-up"></i>
					</button>					
					<button 
						className="btn btn-danger ml-2"
						onClick={this.handleRemoveColleague}
					>
						<i className="fas fa-minus-circle"></i>
					</button>
				</div>
			)
		}

		return(
			<div 
				className="card card-body bg-light mb-3"
				style={{ fontFamily: "Roboto"}}
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
						{ connectButton }

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
					modalOpen={this.state.modalOpen} 
					handleEndorseColleague={this.handleEndorseColleague}
					profile={profile}
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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem)