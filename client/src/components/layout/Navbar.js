import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logoutUser } from "../../actions/authActions"
import { clearCurrentProfile } from "../../actions/profileActions"
import sonyUniverseLogo from "../common/sonyuniverselogo.png"
import NotificationFeed from "../notifications/NotificationFeed"

class Navbar extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			windowWidth: window.innerWidth,
			scrollThresholdMet: 0,
			showDropdown: false
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

	render(){
		const isAuthenticated = this.props.auth.isAuthenticated
		const user = this.props.auth.user
		const windowWidth = this.state.windowWidth

		const authLinks = (
	        <ul className="navbar-nav">
	          <li className="navbar-nav">
	          	<div className="sony-dropdown-menu" id="notifications-dropdown" onClick={this.toggleDropdown}>
		          	<Link to="#" className="nav-link text-light">
		          		<span 
		          			key={Math.random()}
		          		>
		          			<i className="fa fa-bell"></i>
		          		</span> { windowWidth < 576 && "Notifications"}
		          		<NotificationFeed showDropdown={this.state.showDropdown} toggleDropdown={this.toggleDropdown}/>

		          	</Link>
	          	</div>
	          </li>
	          <li className="navbar-nav">
	          	<Link to="/channels" className="nav-link text-light">
	          		<span key={Math.random()}><i className="fa fa-comment"></i></span> {windowWidth < 576 && "Channels"}
	          	</Link>
	          </li>
 			  <li className="navbar-nav">
 			  	<Link to="/feed" className="nav-link text-light">
					<span key={Math.random()}><i className="fa fa-sticky-note"></i></span> {windowWidth < 576 && "Posts"}			  		
 			  	</Link>
 			  </li>	        
 			  <li className="navbar-nav">
 			  	<Link to="/dashboard" className="nav-link text-light">
					<span key={Math.random()}><i className="fa fa-home"></i></span> {windowWidth < 576 && "Dashboard"} 			  		
 			  	</Link>
 			  </li>
	          <li className="nav-item">
	            <a href="/login" onClick={this.onLogoutClick} className="nav-link text-light">
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
	        <ul className="navbar-nav ml-auto">
	          <li className="nav-item">
	            <Link 
	            	className={this.state.windowWidth >= 576 ? "signup-btn auth-btn mr-2" : "nav-link text-light mr-2"} 
	            	to="/register"
	            >
	            	{ windowWidth < 576 ? <span><i className="fa fa-user-plus"></i> Sign Up</span> : "SIGN UP"}
	            </Link>
	          </li>
	          <li className="nav-item">
	            <Link 
	            	className={this.state.windowWidth >= 576 ? "login-btn auth-btn mr-2" : "nav-link text-light mr-2"} 
	            	to="/login"
	            >
	            	{ windowWidth < 576 ? <span><i className="fa fa-chevron-circle-right"></i> Login</span> : "LOGIN" }
	            </Link>
	          </li>
	        </ul>
		)		

		return(
			<div  
				style={{fontFamily: "Kanit"}}
				className="sticky-top"
			>
			  <nav
			  	style={{backgroundImage: "linear-gradient(to bottom, #0072CE, #003087)"}}
			  	className="navbar navbar-expand-sm navbar-dark mb-4"
			  >
			    <div className="container">
			      <Link className="navbar-brand" to="/"><img src={sonyUniverseLogo} className="logo"/></Link>
			      <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#mobile-nav">
			        <span className="navbar-toggler-icon"></span>
			      </button>

			      <div className="collapse navbar-collapse" id="mobile-nav">
			        <ul className="navbar-nav mr-auto">
			          <li className="nav-item">
			            <Link className="nav-link text-light" to="/profiles">
			            	{windowWidth < 576 ? <span key={Math.random()}><i className="fa fa-users"></i> Network</span> : "Network"}
			            </Link>
			          </li>
			        </ul>
			        { isAuthenticated ? authLinks : guestLinks }
			      </div>
			    </div>
			  </nav>			
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		auth: state.auth,
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