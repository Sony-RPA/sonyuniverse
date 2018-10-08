import React from "react"
import { withRouter } from "react-router-dom"
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
			//[event.target.name] is dynamic, it refers to the name of the input being updated,
			//which shares the same name as the piece of state its connected to
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

		this.props.registerUser(newUser, this.props.history)
	}


	render(){
		const errors = this.state.errors

		return(
			<div>
			  <div className="register mt-5" style={{height: "80vh"}}>
			    <div className="container">
			      <div className="row">
			        <div className="col-md-8 m-auto p-0">
			        	<div style={{fontFamily: "Montserrat"}}>
				          <h2 className="text-center bg-black text-light p-2 shadow">SIGN UP</h2>
				          <p className="lead text-center">Create your Sony Universe account</p>
			          	</div>
			          <form noValidate onSubmit={this.onSubmit}>
			          	<TextFieldGroup
			          		placeholder="Name"
			          		name="name"
			          		value={this.state.name}
			          		onChange={this.onChange}
			          		error={errors.name}
			          	/>
			          	<TextFieldGroup
			          		placeholder="Sony Email Address"
			          		name="email"
			          		type="email"
			          		value={this.state.email}
			          		onChange={this.onChange}
			          		error={errors.email}
			          		info="Please provide your Sony registered email address."
			          	/>
			          	<TextFieldGroup
			          		placeholder="Password"
			          		name="password"
			          		type="password"
			          		value={this.state.password}
			          		onChange={this.onChange}
			          		error={errors.password}
			          	/>
			          	<TextFieldGroup
			          		placeholder="Confirm Password"
			          		name="password2"
			          		type="password"
			          		value={this.state.password2}
			          		onChange={this.onChange}
			          		error={errors.password2}
			          	/>
			            <input 
			            	type="submit" 
			            	className="btn btn-info btn-block rounded-0 mt-4" />
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
		registerUser: (userData, history) => {
			dispatch(registerUser(userData, history))
		}
	}
}

//use withRouter to have the ability to redirect within an action creator
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))