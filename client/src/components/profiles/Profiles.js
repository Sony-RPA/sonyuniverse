import React from "react"
import { connect } from "react-redux"
import Spinner from "../common/Spinner"
import ProfileItem from "./ProfileItem"
import { getProfiles } from "../../actions/profileActions"
import { getColleagues } from "../../actions/colleagueActions"


class Profiles extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			profiles: null
		}

		this.filterConnectedColleagues = this.filterConnectedColleagues.bind(this)
	}

	componentDidMount(){
		this.props.getProfiles()
		this.props.getColleagues()
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.profile){
			this.setState({
				profiles: nextProps.profile.profiles
			})
		}
	}

	filterConnectedColleagues = (event) => {
		const connectedColleagues = this.props.colleague.connected
		const allProfiles = this.props.profile.profiles
		//get the profiles of connectedColleagues only
		const connectedColleaguesProfiles = allProfiles.filter((profile) => {
			return connectedColleagues.includes(profile.user._id)
		})
		this.setState({
			profiles: connectedColleaguesProfiles
		})
	}

	filterPendingColleagues = (event) => {
		const pendingColleagues = this.props.colleague.requested
		const allProfiles = this.props.profile.profiles
		//get the profiles of requestedColleagues only
		const pendingColleaguesProfiles = allProfiles.filter((profile) => {
			return pendingColleagues.includes(profile.user._id)
		})
		this.setState({
			profiles: pendingColleaguesProfiles
		})
	}

	filterReceivedColleagues = (event) => {
		const receivedColleagues = this.props.colleague.received
		const allProfiles = this.props.profile.profiles
		//get the profiles of the requestedColleagues only
		const requestedColleaguesProfiles = allProfiles.filter((profile) => {
			return receivedColleagues.includes(profile.user._id)
		})
		this.setState({
			profiles: requestedColleaguesProfiles
		})
	}

	filterAllEmployees = (event) => {
		const allProfiles = this.props.profile.profiles
		this.setState({
			profiles: allProfiles
		})
	}

	render(){
		const { isAuthenticated } = this.props.auth
		const { loading } = this.props.profile
		const profiles = this.state.profiles
		const connected = this.props.colleague.connected.length
		const requested = this.props.colleague.requested.length
		const received = this.props.colleague.received.length
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
								{ isAuthenticated && !loading ? (
									<div className="text-center mb-3" style={{fontFamily: "roboto"}}>
										<button 
											className="btn btn-outline-success btn-sm mr-2"
											onClick={this.filterConnectedColleagues}
											>Connected ({connected})
										</button>
										<button 
											className="btn btn-outline-secondary btn-sm mr-2"
											onClick={this.filterPendingColleagues}
											>Pending ({requested})
										</button>
										<button
											className="btn btn-outline-info btn-sm mr-2"
											onClick={this.filterReceivedColleagues}
										>
											Received ({received})	
										</button>
										<button 
											className="btn btn-outline-primary btn-sm"
											onClick={this.filterAllEmployees}
											>Everyone ({this.props.profile.profiles !== null ? this.props.profile.profiles.length: 0})
										</button>
									</div>
									) : null
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
		profile: state.profile,
		colleague: state.colleague
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