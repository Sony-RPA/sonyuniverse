import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

class Landing extends React.Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push("/dashboard")
		}
	}	

	render(){
		return(
			<div className="landing">
				<div className="dark-overlay landing-inner text-light">
			    	<div className="container">
			    		<div className="row">
			          		<div className="col-md-12 text-center"
			          			style={{fontFamily: "Kanit"}}>
			            		<h1 className="display-4 mb-4" style={{fontWeight: "bolder"}}>
			            			SONY UNIVERSE
			            		</h1>
			            		<p className="lead">
			            			Create your profile and join the family.
			            			<br/>
			            			Share. Connect. Live.
			            		</p>
			            		<hr/>
			            		<Link to="/register" className="btn btn-md btn-success mr-2">SIGN UP</Link>
			            		<Link to="/login" className="btn btn-md btn-info">LOGIN</Link>
			          		</div>
			        	</div>
			      	</div>
			    </div>
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