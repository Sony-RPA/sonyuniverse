import React from "react"
import { connect } from "react-redux"
import { loginUser } from "../../actions/authActions"
import { Link } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"

class Login extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			email: "",
			password: "",
			errors: {}
		}

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push("/dashboard")
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.auth.isAuthenticated){
			this.props.history.push("/dashboard")
		}

		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			})
		}
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	onSubmit = (event) => {
		event.preventDefault()

		const userData = {
			email: this.state.email,
			password: this.state.password
		}

		this.props.loginUser(userData)
	}

	render(){
		const errors = this.state.errors
		return(
			<div style={{height: "80vh"}}>
			  <div className="login mt-5 px-3">
			    <div className="container">
			      <div className="row">
			        <div className="col-md-6 m-auto p-0">
			        	<div className="text-center">
				          <h2 className="bg-black text-light p-2 shadow">LOGIN</h2>
				          <p className="lead">Sign in to your Sony Universe account</p>
			          	</div>
			          <form onSubmit={this.onSubmit}>
			          	<TextFieldGroup
			          		placeholder="Sony Email Address"
			          		name="email"
			          		type="email"
			          		value={this.state.email}
			          		onChange={this.onChange}
			          		error={errors.email}
			          	/>
			          	<TextFieldGroup
			          		placeholder="Password"
			          		name="password"
			          		type="password"
			          		value={this.state.password}
			          		onChange={this.onChange}
			          		error={errors.password}
			          	/>
			          	<Link 
			          		className="float-right mb-3 text-info" 
			          		to="/reset-password"
			          		>
			          		Forgot password?
			          	</Link>
			            <input 
			            	type="submit" 
			            	className="su-button" style={{background: "#17a2b8"}}/>
			          </form>
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
		auth: state.auth,
		errors: state.errors
	}
}


const mapDispatchToProps = (dispatch) => {
	return{
		loginUser: (userData) => {
			dispatch(loginUser(userData))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)