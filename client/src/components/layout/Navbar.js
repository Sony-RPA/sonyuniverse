import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logoutUser } from "../../actions/authActions"
import { clearCurrentProfile } from "../../actions/profileActions"
import sonyUniverseLogo from "../common/sonyuniverselogo.png"
import notificationDot from "../../img/notification_dot.png"
import NotificationFeed from "../notifications/NotificationFeed"
import AuthModal from "./AuthModal"

class Navbar extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			windowWidth: window.innerWidth,
			scrollThresholdMet: 0,
			showDropdown: false,
			openToggler: false,
			modalOpen: false,
			registerOrLogin: null
		}
	}

	componentDidMount(){
		window.addEventListener("resize", this.setWidth)
		window.addEventListener("scroll", this.stickyNav)
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.setWidth)
		window.removeEventListener("scroll", this.stickyNav)
	}

	setWidth = () => {
		this.setState({
			windowWidth: window.innerWidth
		})
	}

	stickyNav = () => {
		let scrolledDistance = window.scrollY
		if(scrolledDistance >= 230){
			this.setState({
				scrollThresholdMet: true
			})
		} else if(scrolledDistance > 0){
			this.setState({
				scrollThresholdMet: false
			})
		} else{
			this.setState({
				scrollThresholdMet: false
			})
		}
	}

	onLogoutClick = (event) => {
		event.preventDefault()
		this.props.clearCurrentProfile()
		this.props.logoutUser()
	}

	toggleDropdown = (event) => {
		this.setState((prevState) => {
			return{
				showDropdown: !prevState.showDropdown
			}
		})
	}

	openToggler = (event) => {
		this.setState((prevState) => {
			return{
				openToggler: !prevState.openToggler
			}
		})
	}

	handleModalOpen = (event) => {
		const name = event ? event.target.name : null
		this.setState((prevState) => {
			return {
				modalOpen: !prevState.modalOpen,
				registerOrLogin: prevState.modalOpen ? null : name == "register" ? "register" : name == "login" ? "login" : null 
			}
		})
	}

	render(){
		const isAuthenticated = this.props.auth.isAuthenticated
		const user = this.props.auth.user
		const windowWidth = this.state.windowWidth
		const openToggler = this.state.openToggler

		//unseen notifications
		const notifications = this.props.notification.notifications.filter((notification) => !notification.seen) || []

		const authLinks = (
	        <ul className="navbar-nav">
	          <li className="navbar-nav">
	          	<div className="sony-dropdown-menu" id="notifications-dropdown" onClick={this.toggleDropdown}>
		          	<Link to="#" className="nav-link text-dark">
		          		<span 
		          			key={Math.random()}
		          		>
		          			<i className="fa fa-bell"></i>
		          		</span>
		          		{ notifications.length > 0 && (
			          		<span style={{ position: "absolute"}}>
			          			<span style={{ position: "absolute", bottom: "-17px", right: "-9px" }}>
			          				<img src={notificationDot}/>
			          			</span>
			          			<span style={{ position: "absolute", top: "-5px", left: "-3px", fontSize: "15px" }}>
			          				{ notifications.length }
			          			</span>
			          		</span>
		          		)}

		      			{ windowWidth < 576 && (
			          		<span 
			          			style={ 
			          				notifications.length > 0 ? {paddingLeft: "10px"} : 
			          				notifications.length == 0 ? {paddingLeft: "5px"} :
			          				{paddingLeft: "0px"}
			          			}
			          		>
			          			Notifications
			          		</span>
		      			)}
		          		<NotificationFeed showDropdown={this.state.showDropdown} toggleDropdown={this.toggleDropdown}/>
		          	</Link>
	          	</div>
	          </li>
	          <li className="navbar-nav">
	          	<Link to="/channels" className="nav-link text-dark">
	          		<span key={Math.random()}><i className="fa fa-comment"></i></span> {windowWidth < 576 && "Channels"}
	          	</Link>
	          </li>
 			  <li className="navbar-nav">
 			  	<Link to="/feed" className="nav-link text-dark">
					<span key={Math.random()}><i className="fa fa-sticky-note"></i></span> {windowWidth < 576 && "Posts"}			  		
 			  	</Link>
 			  </li>	        
 			  <li className="navbar-nav">
 			  	<Link to="/dashboard" className="nav-link text-dark">
					<span key={Math.random()}><i className="fa fa-home"></i></span> {windowWidth < 576 && "Dashboard"} 			  		
 			  	</Link>
 			  </li>
	          <li className="nav-item">
	            <a href="/" onClick={this.onLogoutClick} className="nav-link text-dark">
	            	<img 
	            		className="rounded-circle"
	            		src={user.avatar}
	            		alt={user.name}
	            		style={{ width: "25px", height: "25px", marginRight: "5px" }}
	            	/>
	            	Logout
	            </a>
	          </li>
	        </ul>
		)

		const guestLinks = (
	        <ul className="navbar-nav ml-auto mt-1">
	          <li className="nav-item">
	            <a 
	            	className={this.state.windowWidth >= 576 ? "signup-btn auth-btn mr-2 text-light" : "auth-link nav-link text-dark mr-2"}
	            	onClick={this.handleModalOpen}
	            	name="register"
	            >
	            	{ windowWidth < 576 ? <span><i className="fa fa-user-plus"></i> Sign Up</span> : "SIGN UP"}
	            </a>
	          </li>
	          <li className="nav-item">
	            <a 
	            	className={this.state.windowWidth >= 576 ? "login-btn auth-btn mr-2 text-light" : "auth-link nav-link text-dark mr-2"} 
	            	onClick={this.handleModalOpen}
	            	name="login"
	            >
	            	{ windowWidth < 576 ? <span><i className="fa fa-chevron-circle-right"></i> Login</span> : "LOGIN" }
	            </a>
	          </li>
	        </ul>
		)		

		return(
			<div  
				style={{fontFamily: "Kanit"}}
				className="sticky-top"
			>
			  <nav
			  	style={{background: "#fff"}}
			  	className="navbar navbar-expand-sm navbar-dark mb-4"
			  >
			    <div className="container">
			      <Link className="navbar-brand" to="/"><img src={sonyUniverseLogo} className="logo"/></Link>
			      <button
			      	onClick={this.openToggler}
			      	className="navbar-toggler border-0" 
			      	type="button" 
			      	data-toggle="collapse" 
			      	data-target="#mobile-nav"
			      >
					  <div className={ openToggler ? "opened bar-1" : "bar-1"}></div>
					  <div className={ openToggler ? "opened bar-2" : "bar-2"}></div>
					  <div className={ openToggler ? "opened bar-3" : "bar-3"}></div>
			      </button>

			      <div className="collapse navbar-collapse" id="mobile-nav">
			        <ul className="navbar-nav mr-auto">
			          <li className="nav-item">
			            <Link className="nav-link text-dark" to="/profiles">
			            	{ windowWidth < 576 ? (
			            		<span key={Math.random()}><i className="fa fa-users mr-2"></i>Network</span>
			            	) : (
			            		<span key={Math.random()}><i className="fa fa-users mr-2"></i></span>
			            	)}
			            </Link>
			          </li>
			          <li className="nav-item">
			            <Link className="nav-link text-dark" to="/videos">
			            	{ windowWidth < 576 ? (
			            		<span key={Math.random()}><i className="fa fa-film mr-2"></i>Browse</span>
			            	) : (
			            		<span key={Math.random()}><i className="fa fa-film mr-2"></i></span>
			            	)}
			            </Link>
			          </li>			          
			        </ul>
			        { isAuthenticated ? authLinks : guestLinks }
			      </div>
			    </div>
			  </nav>
			  <AuthModal
			  	modalOpen={this.state.modalOpen}
			  	handleModalOpen={this.handleModalOpen}
			  	registerOrLogin={this.state.registerOrLogin}
			  />

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		auth: state.auth,
		notification: state.notification,
		errors: state.errors
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		logoutUser: () => {
			dispatch(logoutUser())
		},
		clearCurrentProfile: () => {
			dispatch(clearCurrentProfile())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)