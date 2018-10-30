import React from "react"
import SplashPage from "./SplashPage"
import ChatScreen from "./ChatScreen"
import { connect } from "react-redux"

class ChannelsContainer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			chatScreen: false
		}
	}

	componentWillMount(){
		if(this.props.chatkit.chatInitialized){
			this.setState({
				chatScreen: true
			})
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.chatkit.chatInitialized){
			this.setState({
				chatScreen: true
			})
		}
	}

	render(){
		let chatStage
		if(this.state.chatScreen){
			chatStage = <ChatScreen chatUser={this.props.chatkit.chatUser}/>
		} else{
			chatStage = <SplashPage/>
		}
		return(
			<div style={{minHeight: "90vh"}}>
				{chatStage}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		chatkit: state.chatkit
	}
}

export default connect(mapStateToProps)(ChannelsContainer)