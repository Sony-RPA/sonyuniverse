import React from "react"
import { connect } from "react-redux"
import Spinner from "../common/Spinner"
import ProfileItem from "./ProfileItem"
import { getProfiles, getRelatedProfiles } from "../../actions/profileActions"
import { getColleagues } from "../../actions/colleagueActions"
import sonyLogo from "../common/sonylogo.gif"
import SearchBar from "../common/SearchBar"
import { Link } from "react-router-dom"


class Profiles extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			userHasProfile: false,
			profiles: null,
			connectedActive: false,
			pendingActive: false,
			receivedActive: false,
			everyoneActive: false,
			text: ""
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
		let usersWithProfiles = []
		let currentUserId = this.props.auth.user.id

		let foundProfiles = nextProps.profile.profiles

		if(foundProfiles){
			usersWithProfiles = foundProfiles.map((profile) => {
				return profile.user._id
			})
			this.setState({
				profiles: foundProfiles
			})
		}

		//check if user has a profile
		if(usersWithProfiles.includes(currentUserId) && !this.state.userHasProfile){
			this.setState({
				userHasProfile: true
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
		const receivedColleaguesProfiles = allProfiles.filter((profile) => {
			return receivedColleagues.includes(profile.user._id)
		})
		this.setState({
			profiles: receivedColleaguesProfiles,
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

	handleOnChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleOnSubmit = (event) => {
		event.preventDefault()
		const text = this.state.text

		this.setState({
			connectedActive: false,
			pendingActive: false,
			receivedActive: false,
			everyoneActive: false				
		})

		if(text.length > 0){
			this.props.getRelatedProfiles(text)
		} else {
			this.props.getProfiles()
		}
	}

	render(){
		const { isAuthenticated } = this.props.auth
		const { loading } = this.props.profile
		const currentUserId = this.props.auth.user.id
		const profiles = this.state.profiles
		const connectedActive = this.state.connectedActive
		const pendingActive = this.state.pendingActive
		const receivedActive = this.state.receivedActive
		const everyoneActive = this.state.everyoneActive
		const connectedTotal = this.props.colleague.connected.length
		const requestedTotal = this.props.colleague.requested.length
		const receivedTotal = this.props.colleague.received.length
		let userHasProfile = this.state.userHasProfile
		let profileItems

		//create profileItems to be displayed
		if(profiles === null || loading){
			profileItems = <Spinner/>
		} else {
			if(profiles.length > 0){
				profileItems = profiles.map((profile) => {
					return <ProfileItem key={profile._id} profile={profile} userHasProfile={this.state.userHasProfile}/>
				})
			} else {
				profileItems = <h4>No profiles found</h4>
			}
		}

		const filterColleagueButtons = (
			<div className="text-center mb-3">
				<button 
					className={connectedActive ? "btn btn-info btn-sm mr-2" : "btn btn-dark btn-sm mr-2"}
					onClick={this.filterConnectedColleagues}
					>Connected ({connectedTotal})
				</button>
				<button 
					className={pendingActive ? "btn btn-info btn-sm mr-2" : "btn btn-dark btn-sm mr-2"}
					onClick={this.filterPendingColleagues}
					>Pending ({requestedTotal})
				</button>
				<button
					className={receivedActive ? "btn btn-info btn-sm mr-2" : "btn btn-dark btn-sm mr-2"}
					onClick={this.filterReceivedColleagues}
					>Received ({receivedTotal})	
				</button>
				<button 
					className={everyoneActive ? "btn btn-info btn-sm mr-2" : "btn btn-dark btn-sm"}
					onClick={this.filterAllEmployees}
					>Everyone ({this.props.profile.profiles !== null ? this.props.profile.profiles.length: 0})
				</button>
			</div>
		)

		return(
			<div className="profiles mt-5" style={{minHeight: "100vh"}}>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div style={{fontFamily: "Montserrat"}}>
								<h1 className="text-center bg-black text-light shadow">
									<img src={sonyLogo} style={{height: "25px", width: "85px", marginBottom: "5px"}}/>
								</h1>
								<p className="lead text-center">Learn and connect with our team</p>
								{ isAuthenticated && !loading && userHasProfile ? filterColleagueButtons : null}
								{ isAuthenticated && ! loading && !userHasProfile ? (
									<div className="text-center mb-4">
										<Link to="/create-profile"
											className="su-button" 
											style={{background: "#ffc107", color: "#333", textDecoration: "none"}}>
											Create your profile to start building your network
										</Link>
									</div>
								) : null }
							</div>
							<SearchBar 
								text={this.state.text} 
								handleOnChange={this.handleOnChange} 
								handleOnSubmit={this.handleOnSubmit}
							/>
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
		},
		getRelatedProfiles: (text) => {
			dispatch(getRelatedProfiles(text))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)