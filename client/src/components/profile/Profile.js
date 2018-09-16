import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import ProfileHeader from "./ProfileHeader"
import ProfileAbout from "./ProfileAbout"
import ProfileCreds from "./ProfileCreds"
import ProfileGithub from "./ProfileGithub"
import Spinner from "../common/Spinner"
import { getProfileByHandle } from "../../actions/profileActions"

class Profile extends React.Component{
	componentDidMount(){
		if(this.props.match.params.handle){
			this.props.getProfileByHandle(this.props.match.params.handle)
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.profile.profile === null && this.props.profile.loading){
			this.props.history.push("/not-found")
		}
	}

	render(){
		const { profile, loading } = this.props.profile
		let profileContent

		if(profile === null || loading){
			profileContent = <Spinner/>
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-12">
							<Link to="/profiles" className="btn btn-secondary mb-3 float-left">
								Back to Profiles
							</Link>
						</div>
						<div className="col-md-12"></div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<ProfileHeader profile={profile}/>
							<ProfileAbout profile={profile}/>
							<ProfileCreds education={profile.education} experience={profile.experience}/>
							{profile.githubusername ? <ProfileGithub username={profile.githubusername}/> : null}
						</div>
					</div>
				</div>
			)
		}

		return(
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">{profileContent}</div>
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return{
		profile: state.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		getProfileByHandle: (handle) => {
			dispatch(getProfileByHandle(handle))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)