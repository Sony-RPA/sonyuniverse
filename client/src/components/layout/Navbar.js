import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logoutUser } from "../../actions/authActions"
import { clearCurrentProfile } from "../../actions/profileActions"
import sonyUniverseLogo from"../common/sonyuniverselogo.png"

class Navbar extends React.Component{
	constructor(props){
		super(props)

		this.onLogoutClick = this.onLogoutClick.bind(this)
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
	        <ul className="navbar-nav ml-auto">
 			  <li className="navbar-nav ml-auto">
 			  	<Link to="/feed" className="nav-link">
					Post Feed 			  		
 			  	</Link>
 			  </li>	        
 			  <li className="navbar-nav ml-auto">
 			  	<Link to="/dashboard" className="nav-link">
					Dashboard 			  		
 			  	</Link>
 			  </li>
	          <li className="nav-item">
	            <a href="" onClick={this.onLogoutClick} className="nav-link">
	            	<img 
	            		className="rounded-circle"
	            		src={user.avatar}
	            		alt={user.name}
	            		style={{ width: "25px", marginRight: "5px" }}
	            		title="You must have a Gravatar connected to your email to display an image"
	            	/>
	            	Logout
	            </a>
	          </li>
	        </ul>
		)

		const guestLinks = (
	        <ul className="navbar-nav ml-auto">
	          <li className="nav-item">
	            <Link className="nav-link" to="/register">Sign Up</Link>
	          </li>
	          <li className="nav-item">
	            <Link className="nav-link" to="/login">Login</Link>
	          </li>
	        </ul>
		)		

		return(
			<div>
			  <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
			    <div className="container">
			      <Link className="navbar-brand" to="/"><img src={sonyUniverseLogo} className="logo"/></Link>
			      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
			        <span className="navbar-toggler-icon"></span>
			      </button>

			      <div className="collapse navbar-collapse" id="mobile-nav">
			        <ul className="navbar-nav mr-auto">
			          <li className="nav-item">
			            <Link className="nav-link" to="/api/profiles"> Professionals
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