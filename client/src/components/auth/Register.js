import React from "react"
import { connect } from "react-redux"
import { registerUser } from "../../actions/authActions"
import TextFieldGroup from "../common/TextFieldGroup"

class Register extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			name: "",
			email: "",
			password: "",
			password2: "",
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

	//life-cycle method will run when the component receives props from our redux
	componentWillReceiveProps(nextProps){
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

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
		}

		this.props.registerUser(newUser)
	}

	render(){
		const errors = this.state.errors

		return(
			<div style={{minHeight: "48vh"}}>
			  <div className="register">
			    <div className="container">
			      <div className="row d-block">
			        <div className="m-auto p-0">
			        	<div className="text-center">
				          <h2 className="bg-black text-light p-2 shadow">SIGN UP</h2>
				          <p className="text-light">Create your Sony Universe account</p>
			          	</div>
			          <form noValidate onSubmit={this.onSubmit}>
			          	<TextFieldGroup
			          		placeholder="Name"
			          		name="name"
			          		value={this.state.name}
			          		onChange={this.onChange}
			          		error={errors.name}
			          		additionalClass="dark-noRounded-Input"
			          	/>
			          	<TextFieldGroup
			          		placeholder="Sony Email Address"
			          		name="email"
			          		type="email"
			          		value={this.state.email}
			          		onChange={this.onChange}
			          		error={errors.email}
			          		info="Please provide your Sony registered email address."
			          		additionalClass="dark-noRounded-Input"
			          	/>
			          	<TextFieldGroup
			          		placeholder="Password"
			          		name="password"
			          		type="password"
			          		value={this.state.password}
			          		onChange={this.onChange}
			          		error={errors.password}
			          		additionalClass="dark-noRounded-Input"
			          	/>
			          	<TextFieldGroup
			          		placeholder="Confirm Password"
			          		name="password2"
			          		type="password"
			          		value={this.state.password2}
			          		onChange={this.onChange}
			          		error={errors.password2}
			          		additionalClass="dark-noRounded-Input"
			          	/>
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
		registerUser: (userData) => {
			dispatch(registerUser(userData))
		}
	}
}

//use withRouter to have the ability to redirect within an action creator
export default connect(mapStateToProps, mapDispatchToProps)(Register)