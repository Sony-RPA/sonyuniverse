import React from "react"
import { Link } from "react-router-dom"
import isEmpty from "../../validation/is-empty"
import { connect } from "react-redux"

class ProfileItem extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		const profile = this.props.profile
		const isAuthenticated = this.props.auth.isAuthenticated
		const userId = this.props.auth.user.id
		let connectButton
		if(isAuthenticated && userId !== profile.user._id){
			connectButton = <button className="btn btn-success ml-1">Connect</button>
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
		auth: state.auth
	}
}


export default connect(mapStateToProps)(ProfileItem)