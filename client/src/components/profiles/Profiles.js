import React from "react"
import { connect } from "react-redux"
import Spinner from "../common/Spinner"
import ProfileItem from "./ProfileItem"
import { getProfiles } from "../../actions/profileActions"
import { getColleagues } from "../../actions/colleagueActions"


class Profiles extends React.Component{
	componentDidMount(){
		this.props.getProfiles()
		this.props.getColleagues()
	}

	render(){
		const { isAuthenticated } = this.props.auth
		const { profiles, loading } = this.props.profile
		let profileItems

		if(profiles === null || loading){
			profileItems = <Spinner/>
		} else {
			if(profiles.length > 0){
				profileItems = profiles.map((profile) => {
					return <ProfileItem key={profile._id} profile={profile}/>
				})
			} else {
				profileItems = <h4>No profiles found</h4>
			}
		}

		return(
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div style={{fontFamily: "Montserrat"}}>
								<h1 
									className="display-4 text-center"
								>
									SONY FAMILY
								</h1>
								<p className="lead text-center">Browse and connect with colleagues</p>
								{ isAuthenticated && (
									<div className="text-center mb-3" style={{fontFamily: "roboto"}}>
										<button className="btn btn-outline-success btn-sm">Connected</button>
										<button className="btn btn-outline-secondary btn-sm ml-2 mr-2">Pending</button>
										<button className="btn btn-outline-primary btn-sm">Everyone</button>
									</div>
									)
								}
							</div>
							{profileItems}
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
		getProfiles: () => {
			dispatch(getProfiles())
		},
		getColleagues: () => {
			dispatch(getColleagues())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)