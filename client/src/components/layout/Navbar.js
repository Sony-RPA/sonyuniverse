import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logoutUser } from "../../actions/authActions"
import { clearCurrentProfile } from "../../actions/profileActions"
import sonyUniverseLogo from"../common/sonyuniverselogo.png"

class Navbar extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			windowWidth: window.innerWidth,
			scrollThresholdMet: 0
		}

		this.onLogoutClick = this.onLogoutClick.bind(this)
		this.setWidth = this.setWidth.bind(this)
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

	render(){
		const isAuthenticated = this.props.auth.isAuthenticated
		const user = this.props.auth.user

		const authLinks = (
	        <ul className="navbar-nav">
	          <li className="navbar-nav">
	          	<Link to="/channels" className="nav-link text-light">
	          		Channels
	          	</Link>
	          </li>
 			  <li className="navbar-nav">
 			  	<Link to="/feed" className="nav-link text-light">
					Posts			  		
 			  	</Link>
 			  </li>	        
 			  <li className="navbar-nav">
 			  	<Link to="/dashboard" className="nav-link text-light">
					Dashboard 			  		
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
	            	className={this.state.windowWidth >= 576 ? "btn btn-outline-success mr-2 nav-btn" : "nav-link text-light mr-2"} 
	            	to="/register"
	            	>SIGN UP

	            </Link>
	          </li>
	          <li className="nav-item">
	            <Link 
	            	className={this.state.windowWidth >= 576 ? "btn btn-outline-info mr-2 nav-btn" : "nav-link text-light mr-2"} 
	            	to="/login"
	            	>LOGIN
	            </Link>
	          </li>
	        </ul>
		)		

		return(
			<div  
				style={{fontFamily: "Kanit"}}
				className="sticky-top">
			  <nav 
			  	className={ this.state.scrollThresholdMet ? (
			  			"navbar navbar-expand-sm navbar-dark mb-4 transparent"
			  		) : (
			  			"navbar navbar-expand-sm navbar-dark mb-4 bg-black"
			  		)
			  	}
			  >
			    <div className="container">
			      <Link className="navbar-brand" to="/"><img src={sonyUniverseLogo} className="logo"/></Link>
			      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
			        <span className="navbar-toggler-icon"></span>
			      </button>

			      <div className="collapse navbar-collapse" id="mobile-nav">
			        <ul className="navbar-nav mr-auto">
			          <li className="nav-item">
			            <Link className="nav-link text-light" to="/profiles">NETWORK
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