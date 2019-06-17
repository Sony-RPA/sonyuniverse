import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Fade } from "react-reveal"
import Teams from "./Teams"
import Featured from "./Featured"
import Highlight from "./Highlight"
import AuthModal from "./AuthModal"

class Landing extends React.Component{
	state = {
		modalOpen: false
	}

	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push("/dashboard")
		}
	}

	handleModalOpen = () => {
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

	render(){
		return(
			<div>
				<div className="landing">
					<Fade>
						<div className="dark-overlay landing-inner text-light">
							<Fade top>
							    <div className="container">
								    <div className="row">
						      		    <div 
						      		    	className="col-md-12 text-center"
						      			    style={{fontFamily: "Kanit"}}>
						        		    <h1 className="display-4 mb-4" style={{fontWeight: "bolder"}}>
						        			SONY UNIVERSE
						        		    </h1>
						        		    <p className="lead">
						        				Find your party and get started.
						        				<br/>
						        				Share. Connect. Live.
						        		    </p>
						        		    <hr/>
						        		    <a
						        		    	onClick={this.handleModalOpen}
						        		    	to="/login" 
						        		    	className="landing-login-button"
						        		    	style={{width: "180px"}}
						        		    >
						        		    	LOGIN
						        		    </a>
						      		    </div>
						    		</div>
						      	</div>
						  	</Fade>
					    </div>
				    </Fade>
		  		</div>
		  		<AuthModal
		  			modalOpen={this.state.modalOpen}
		  			registerOrLogin="login"
		  			handleModalOpen={this.handleModalOpen}
		  		/>
		  		<Featured/>
		  		<Teams/>
		  		<Highlight/>
	  		</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Landing)