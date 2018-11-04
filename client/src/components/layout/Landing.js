import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { Fade } from "react-reveal"
import Teams from "./Teams"

class Landing extends React.Component{
	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push("/dashboard")
		}
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
						        		    <Link 
						        		    	to="/login" 
						        		    	className="landing-login-button"
						        		    	style={{width: "180px"}}
						        		    >
						        		    	LOGIN
						        		    </Link>
						      		    </div>
						    		</div>
						      	</div>
						  	</Fade>
					    </div>
				    </Fade>
		  		</div>
		  		<Teams/>
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