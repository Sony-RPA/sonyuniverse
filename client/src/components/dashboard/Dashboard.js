import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions"
import Spinner from "../common/Spinner"
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
	}

	onDeleteAccount = (event) => {
		this.props.deleteAccount()
	}

	render(){
		const { user } = this.props.auth
		const { profile, loading } = this.props.profile

		let dashboardContent;

		if(loading){
			dashboardContent = <Spinner/>
		} else{
			//check if logged in user has profile data
			if(profile){
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
						</p>
						<ProfileActions/>

						<Experience 
							experience={profile.experience}
						/>

						<Education
							education={profile.education}
						/>

						<div style={{ marginBottom: "60px" }}></div>
						<button 
							className="btn btn-danger"
							onClick={this.onDeleteAccount}
						>
							Delete My Account
						</button>
					</div>
				)
			} else{
				//User is logged in but has no profile
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome { user.name }</p>
						<p>You have not setup a profile, please add some info.</p>
						<Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
					</div>
				)
			}
		}

		return(
			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Dashboard</h1>
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
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)