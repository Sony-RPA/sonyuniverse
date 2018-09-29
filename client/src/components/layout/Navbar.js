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
	        <ul className="navbar-nav">
 			  <li className="navbar-nav">
 			  	<Link to="/feed" className="nav-link">
					Post Feed 			  		
 			  	</Link>
 			  </li>	        
 			  <li className="navbar-nav">
 			  	<Link to="/dashboard" className="nav-link">
					Dashboard 			  		
 			  	</Link>
 			  </li>
	          <li className="nav-item">
	            <a href="/login" onClick={this.onLogoutClick} className="nav-link">
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
	            <Link className="nav-link" to="/register">SIGN UP</Link>
	          </li>
	          <li className="nav-item">
	            <Link className="nav-link" to="/login">LOGIN</Link>
	          </li>
	        </ul>
		)		

		return(
			<div style={{fontFamily: "Kanit"}}>
			  <nav className="navbar navbar-expand-sm navbar-dark bg-black mb-4">
			    <div className="container">
			      <Link className="navbar-brand" to="/"><img src={sonyUniverseLogo} className="logo"/></Link>
			      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
			        <span className="navbar-toggler-icon"></span>
			      </button>

			      <div className="collapse navbar-collapse" id="mobile-nav">
			        <ul className="navbar-nav mr-auto">
			          <li className="nav-item">
			            <Link className="nav-link" to="/profiles">NETWORK
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