import React from "react"
import InputGroup from "../common/InputGroup"
import { connect } from "react-redux"
import { createChatkitUser } from "../../actions/chatkitActions"

class SplashPage extends React.Component{
	constructor(props){
		super(props)

		this.handleOnSubmit = this.handleOnSubmit.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			})
		}
	}

	handleOnSubmit = (event) => {
		event.preventDefault()
		this.props.createChatkitUser()
	}

	render(){
		return(
			<div className="channels">
				<div className="dark-overlay landing-inner" style={{fontFamily: "montserrat"}}>
					<div className="container text-center">
						<div className="row">
							<div className="col-md-6" style={{margin: "0 auto"}}>
								<h3 className="text-light mb-3">Welcome back to the party</h3>
								<form onSubmit={this.handleOnSubmit}>
									<button className="su-button" style={{background: "#25a86e", width: "75%"}}>Enter</button>
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
		chatkit: state.chatkit,
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		createChatkitUser: () => {
			dispatch(createChatkitUser())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage)