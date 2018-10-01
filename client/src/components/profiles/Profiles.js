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
			profiles: null,
			connectedActive: false,
			pendingActive: false,
			receivedActive: false,
			everyoneActive: false
		}
		this.filterConnectedColleagues = this.filterConnectedColleagues.bind(this)
		this.filterPendingColleagues = this.filterPendingColleagues.bind(this)
		this.filterReceivedColleagues = this.filterReceivedColleagues.bind(this)
		this.filterAllEmployees = this.filterAllEmployees.bind(this)
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
			profiles: connectedColleaguesProfiles,
			connectedActive: true,
			pendingActive: false,
			receivedActive: false,
			everyoneActive: false
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
			profiles: pendingColleaguesProfiles,
			connectedActive: false,
			pendingActive: true,
			receivedActive: false,
			everyoneActive: false			
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
			profiles: requestedColleaguesProfiles,
			connectedActive: false,
			pendingActive: false,
			receivedActive: true,
			everyoneActive: false			
		})
	}

	filterAllEmployees = (event) => {
		const allProfiles = this.props.profile.profiles
		this.setState({
			profiles: allProfiles,
			connectedActive: false,
			pendingActive: false,
			receivedActive: false,
			everyoneActive: true			
		})
	}

	render(){
		const { isAuthenticated } = this.props.auth
		const { loading } = this.props.profile
		const profiles = this.state.profiles
		const connectedActive = this.state.connectedActive
		const pendingActive = this.state.pendingActive
		const receivedActive = this.state.receivedActive
		const everyoneActive = this.state.everyoneActive
		const connectedTotal = this.props.colleague.connected.length
		const requestedTotal = this.props.colleague.requested.length
		const receivedTotal = this.props.colleague.received.length
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

		const filterColleagueButtons = (
			<div className="text-center mb-3" style={{fontFamily: "roboto"}}>
				<button 
					className={connectedActive ? "btn btn-success btn-sm mr-2" : "btn btn-outline-success btn-sm mr-2"}
					onClick={this.filterConnectedColleagues}
					>Connected ({connectedTotal})
				</button>
				<button 
					className={pendingActive ? "btn btn-secondary btn-sm mr-2" : "btn btn-outline-secondary btn-sm mr-2"}
					onClick={this.filterPendingColleagues}
					>Pending ({requestedTotal})
				</button>
				<button
					className={receivedActive ? "btn btn-info btn-sm mr-2" : "btn btn-outline-info btn-sm mr-2"}
					onClick={this.filterReceivedColleagues}
					>Received ({receivedTotal})	
				</button>
				<button 
					className={everyoneActive ? "btn btn-primary btn-sm mr-2" : "btn btn-outline-primary btn-sm"}
					onClick={this.filterAllEmployees}
					>Everyone ({this.props.profile.profiles !== null ? this.props.profile.profiles.length: 0})
				</button>
			</div>
		)

		return(
			<div className="profiles">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div style={{fontFamily: "Montserrat"}}>
								<h1 className="display-4 text-center">SONY FAMILY</h1>
								<p className="lead text-center">Browse and connect with colleagues</p>
								{ isAuthenticated && !loading ? filterColleagueButtons : null}
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