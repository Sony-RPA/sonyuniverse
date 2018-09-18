import React from "react"
import { Link } from "react-router-dom"
import isEmpty from "../../validation/is-empty"
import { connect } from "react-redux"
import { addColleague, acceptColleague } from "../../actions/colleagueActions"

class ProfileItem extends React.Component{
	constructor(props){
		super(props)

		this.handleRequestColleague = this.handleRequestColleague.bind(this)
		this.handleReceivedColleague = this.handleReceivedColleague.bind(this)
	}

	handleRequestColleague = (event) => {
		const requestedColleague = this.props.profile.user._id
		this.props.addColleague(requestedColleague)
	}

	handleReceivedColleague = (event) => {
		const receivedColleague = this.props.profile.user._id
		this.props.acceptColleague(receivedColleague)
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
					className="btn btn-success ml-1"
					onClick={this.handleRequestColleague}
				>
					Connect
				</button>
			)
		} else if(isAuthenticated && requested.includes(profile.user._id)){
		//display pending invitation button 
			connectButton = (
				<button className="btn btn-outline-dark ml-1" disabled>
					Pending
				</button>
			)
		} else if(isAuthenticated && received.includes(profile.user._id)){
		//display accept invitation button
			connectButton = (
				<button 
					className="btn btn-outline-success ml-1"
					onClick={this.handleReceivedColleague}
				>
					Accept <i class="fas fa-check-circle"></i>
				</button>
			)
		} else if(isAuthenticated && connected.includes(profile.user._id)){
		//display messsage button
			connectButton = (
				<div style={{display: "inline-block"}}>
					<button className="btn btn-primary ml-1">
						<i class="fas fa-comments"></i>
					</button>
					<button className="btn btn-outline-danger ml-2">
						<i class="fas fa-minus-circle"></i>
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
						<img 
							src={profile.user.avatar} 
							alt="" 
							className="rounded-circle d-none d-md-block avatar"
						/>
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
						<h4>Skill Set</h4>
						<ul className="list-group">
							{ profile.skills.slice(0, 4).map((skill, index) => (
								<li key={index} className="bg-dark text-light border border-light list-group-item">
									<i className="fa fa-check pr-1 text-success"/>
									{skill}	
								</li>
							))}
						</ul>
					</div>
				</div>
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
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem)