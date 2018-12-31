import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions"
import { getNotifications } from "../../actions/notificationActions"
import Loader from "../common/Loader"
import ProfileActions from "./ProfileActions"
import Experience from "./Experience"
import Education from "./Education"


class Dashboard extends React.Component{
	constructor(props){
		super(props)

	this.onDeleteAccount = this.onDeleteAccount.bind(this)
	}

	componentDidMount(){
		this.props.getCurrentProfile()
		this.props.getNotifications()
	}

	onDeleteAccount = (event) => {
		this.props.deleteAccount()
	}

	render(){
		const { user } = this.props.auth
		const { profile, loading } = this.props.profile

		let dashboardContent;

		if(loading){
			dashboardContent = <Loader/>
		} else{
			//check if logged in user has profile data
			if(profile){
				dashboardContent = (
					<div>
						<p className="lead text-dark">
							Welcome back&nbsp; 
							<Link 
								to={`/profile/${profile.handle}`} 
								className="text-info font-weight-bold">
								{user.name}
							</Link>
						</p>
						<ProfileActions/>

						<Experience 
							experience={profile.experience}
						/>

						<Education
							education={profile.education}
						/>

						<button
 							className="btn btn-danger shadow"
							onClick={this.onDeleteAccount}
						>
							Delete My Account
						</button>
					</div>
				)
			} else{
				//User is logged in but has no profile
				dashboardContent = (
					<div className="text-center">
						<p className="lead text-muted">Welcome { user.name }</p>
						<p>You have not setup a profile, please add some info.</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
					</div>
				)
			}
		}

		return(
			<div className="dashboard pt-5 pb-5" style={{fontFamily: "roboto", minHeight: "100vh"}}>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="text-center mb-4">
								<img 
									src={user.avatar}
									className="rounded-circle shadow"
									style={{height: "200px", width: "200px"}}
								/>
							</div>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		auth: state.auth,
		profile: state.profile
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		getCurrentProfile: () => {
			dispatch(getCurrentProfile())
		},
		deleteAccount: () => {
			dispatch(deleteAccount())
		},
		getNotifications: () => {
			dispatch(getNotifications())
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)