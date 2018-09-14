import React from "react"
import { connect } from "react-redux"
import { loginUser } from "../../actions/authActions"
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
			<div>
			  <div className="login">
			    <div className="container">
			      <div className="row">
			        <div className="col-md-8 m-auto">
			        	<div style={{fontFamily: "Montserrat"}}>
				          <h1 className="display-4 text-center">LOGIN</h1>
				          <p className="lead text-center">Sign in to your Sony Universe account</p>
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
			            <input 
			            	type="submit" 
			            	className="btn btn-info btn-block mt-4" />
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