import React from "react"
import Chatkit from "@pusher/chatkit"
import MessageList from "./MessageList"
import SendMessageForm from "./SendMessageForm"
import WhosOnlineList from "./WhosOnlineList"
import RoomList from "./RoomList"
import NewRoomForm from "./NewRoomForm"
import { getCurrentRoom } from "../../actions/chatkitActions"
import { connect } from "react-redux"

class ChatScreen extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			messages: [],
			currentRoom: {},
			currentUser: {},
			usersWhoAreTyping: [],
			joinableRooms: [],
			joinedRooms: [],
			errors: {}
		}

		this.sendMessage = this.sendMessage.bind(this)
		this.sendTypingEvent = this.sendTypingEvent.bind(this)
		this.subscribeToRoom = this.subscribeToRoom.bind(this)
		this.getRooms = this.getRooms.bind(this)
		this.createRoom = this.createRoom.bind(this)
	}

	componentDidMount(){
		//setup Chatkit
		let tokenUrl
		let instanceLocator = "v1:us1:6ca69dc3-5327-46d0-a4d3-7f2dd6539e1c"
		if(process.env.NODE_ENV === "production"){
			tokenUrl = "https://www.sonyuniverse.org/api/channels/authenticate"
		} else {
			tokenUrl = "http://localhost:3000/api/channels/authenticate"
		}

		const chatManager = new Chatkit.ChatManager({
			instanceLocator: instanceLocator,
			userId: this.props.chatUser.name,
			connectionTimeout: 120000,
			tokenProvider: new Chatkit.TokenProvider({
				url: tokenUrl
			})
		})

		//initiate Chatkit
		chatManager.connect()
			.then((currentUser) => {
				this.setState({
					currentUser: currentUser
				})
				//get all rooms
				this.getRooms()

				// if the user is returning to the chat, direct them to the room they last visited
				if(this.props.chatkit.currentRoom.id > 0){
					this.subscribeToRoom(this.props.chatkit.currentRoom.id)
				}
			})
	}

	sendMessage = (text) => {
		this.state.currentUser.sendMessage({
			roomId: this.state.currentRoom.id,
			text: text
		})
	}

	sendTypingEvent = () => {
		this.state.currentUser
			.isTypingIn({
				roomId: this.state.currentRoom.id
			})
			.catch((errors) => {
				this.setState({
					errors: errors
				})
			})
	}

	getRooms = () => {
		this.state.currentUser.getJoinableRooms()
			.then((joinableRooms) => {
				this.setState({
					joinableRooms: joinableRooms,
					joinedRooms: this.state.currentUser.rooms
				})
			})
			.catch((errors) => {
				this.setState({
					errors: { error: "could not retrieve rooms"}
				})
			})
	}

	subscribeToRoom = (roomId) => {
		this.setState({
			messages: []
		})
		this.state.currentUser.subscribeToRoom({
			roomId: roomId,
			hooks: {
				onNewMessage: (message) => {
					this.setState({
						messages: [...this.state.messages, message]
					})
				},
				onUserStartedTyping: (currentUser) => {
					this.setState({
						usersWhoAreTyping: [...this.state.usersWhoAreTyping, currentUser.name]
					})
				},
				onUserStoppedTyping: (currentUser) => {
					this.setState({
						usersWhoAreTyping: this.state.usersWhoAreTyping.filter((user) => {
							return user !== currentUser.name
						})
					})
				},
				onUserCameOnline: () => this.forceUpdate(),
				onUserWentOffline: () => this.forceUpdate(),
				onUserJoined: () => this.forceUpdate()
			}			
		})
		.then((currentRoom) => {
			this.setState({
				currentRoom: currentRoom
			})
			this.getRooms()
			//store currentRoom in redux state
			this.props.getCurrentRoom(currentRoom)
		})
		.catch((errors) => {
			this.setState({
				errors: errors
			})
		})
	}

	createRoom = (roomName) => {
		this.state.currentUser.createRoom({
			name: roomName
		})
		.then((newRoom) => {
			this.subscribeToRoom(newRoom.id)
		})
		.catch((errors) => {
			this.setState({
				errors: { error: "could not create room" }
			})
		})
	}

	render(){
		const username = this.props.chatUser.name
		return(
			<div className="container" style={{ display: "flex", fontFamily: "Montserrat", height: "100vh"}}>
				<div 
					className="col-md-3 bg-dark mr-2 p-0" 
					style={{display: "flex", flexDirection: "column", maxHeight: "80vh", padding: "24px 24px 0px"}}
				>
					<div style={{flex: "1"}} className="p-4">
						<WhosOnlineList users={this.state.currentRoom.users}/>
						<RoomList
							roomId={this.state.currentRoom.id} 
							rooms={[...this.state.joinedRooms, ...this.state.joinableRooms]}
							subscribeToRoom={this.subscribeToRoom}
						/>
					</div>
					<NewRoomForm createRoom={this.createRoom} user={this.state.currentUser}/>
				</div>

				<div 
					className="col-md-9 border p-0" 
					style={{display: "flex", flexDirection: "column", maxHeight: "80vh"}}
				>
					<div className="mb-3">
						{ this.state.currentRoom.name ? (
							<h4 
								className="bg-black text-light m-0" 
								style={{padding: "1.0rem 1.2rem"}}
							>
								{this.state.currentRoom.name}
							</h4>
							) : ( 
							this.props.chatkit.currentRoom.id > 0 ) ? ( 
								<h3 className="text-dark p-4">Returning to room...</h3>
							) : (
								<h3 className="text-dark p-4">&larr; Join a Room!</h3>
						)}
					</div>
					<div style={{flex: "1"}}>
						<MessageList messages={this.state.messages} room={this.state.currentRoom.id} usersWhoAreTyping={this.state.usersWhoAreTyping}/>
					</div>
					<SendMessageForm 
						sendMessage={this.sendMessage}
						userTyping={this.sendTypingEvent} 
						currentRoom={this.state.currentRoom}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		chatkit: state.chatkit
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		getCurrentRoom: (currentRoom) => {
			dispatch(getCurrentRoom(currentRoom))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)