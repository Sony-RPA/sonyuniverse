import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"

const PrivateRoute = ({ component: Component, auth, ...rest}) => {
	return(
		<Route 
			{...rest}
			//route has a render prop that lets you create a component in-line with the route
			render = {props =>
				auth.isAuthenticated === true ? (
					<Component {...props} />
				) : (
					<Redirect to="/login"/>
				)
			}
		/>
	)
}

const mapStateToProps = (state) => {
	return{
		auth: state.auth
	}
}

export default connect(mapStateToProps)(PrivateRoute)