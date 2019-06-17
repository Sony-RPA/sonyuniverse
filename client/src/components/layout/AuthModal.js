import React from "react"
import Modal from "react-modal"
import Login from "../auth/Login"
import Register from "../auth/Register"
import { Slide } from "react-reveal"
import { connect } from "react-redux"

class AuthModal extends React.Component{
	state = {
		windowWidth: window.innerWidth,
		createdUser: false
	}

	componentDidMount(){
		window.addEventListener("resize", this.setWidth)
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.setWidth)
	}

	setWidth = () => {
		this.setState({
			windowWidth: window.innerWidth
		})
	}

	componentDidUpdate(prevProps){
		if(this.props.auth !== prevProps.auth){
			const { user } = this.props.auth 
			this.setState({
				createdUser: Object.keys(user).length > 0 ? true : false
			})
		}
	}

	createInitialModal = () => {
		const { registerOrLogin } = this.props
		const { windowWidth } = this.state
		const modalWidth = windowWidth < 576 ? "90%" : windowWidth >= 768 && windowWidth < 1024 ? "50%" : windowWidth >= 1024 && "30%"
		return(
			<Modal
				isOpen={this.props.modalOpen}
				onRequestClose={this.props.handleModalOpen}
				ariaHideApp={false}
				style={{
					overlay: {
						background: "rgba(0, 0, 0, 0.3)",
						zIndex: "9999"
					},
					content: {
						background: "rgba(31, 31, 31, .85)",
						fontFamily: "Roboto",
						minHeight: "10rem",
						top: "45%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						transform: 'translate(-50%,-50%)',
						width: `${modalWidth}`,
						border: "none",
						textAlign: "center"
	      			}
				}}				
			>
				{
					registerOrLogin == "register" ? 
					<Register closeModal={this.props.handleModalOpen}/> : 
					<Login insideModal={true} closeModal={this.props.handleModalOpen}/>
				}
			</Modal>
		)
	}

	renderFirstLoginModal = () => {
		const { windowWidth } = this.state
		const modalWidth = windowWidth < 576 ? "90%" : windowWidth >= 768 && windowWidth < 1024 ? "50%" : windowWidth >= 1024 && "30%"
		return(
			<Modal
				isOpen={this.props.modalOpen}
				onRequestClose={this.props.handleModalOpen}
				ariaHideApp={false}
				style={{
					overlay: {
						background: "rgba(0, 0, 0, 0.3)",
					},
					content: {
						background: "rgba(31, 31, 31, .85)",
						fontFamily: "Roboto",
						minHeight: "15rem",
						top: "45%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						transform: 'translate(-50%,-50%)',
						width: `${modalWidth}`,
						border: "none",
						textAlign: "center",
						overflow:"hidden"
	      			}
				}}				
			>
				<Slide right>
					<p className="text-light">
						Your <span className="text-info">Sony Universe<sup>TM</sup></span>{" "}
						account has been successfully created!
					</p>
					<Login insideModal={true} closeModal={this.props.handleModalOpen}/>
				</Slide>
			</Modal>			
		)
	}

	render(){
		const { createdUser } = this.state
		return(
			!createdUser ? this.createInitialModal() : this.renderFirstLoginModal()
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}


export default connect(mapStateToProps)(AuthModal)