import React from "react"
import Chatkit from "@pusher/chatkit"
import MessageList from "./MessageList"
import SendMessageForm from "./SendMessageForm"
import WhosOnlineList from "./WhosOnlineList"
import RoomList from "./RoomList"
import NewRoomForm from "./NewRoomForm"
import { recordLastRoom, clearRoom, getRefinedUser, getChatkitUsers } from "../../actions/chatkitActions"
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
			roomUsers: [],
			errors: {}
		}

		this.initiateChatkit = this.initiateChatkit.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.sendTypingEvent = this.sendTypingEvent.bind(this)
		this.subscribeToRoom = this.subscribeToRoom.bind(this)
		this.getRooms = this.getRooms.bind(this)
		this.createRoom = this.createRoom.bind(this)
		this.redirectToLastRoom = this.redirectToLastRoom.bind(this)
		this.findChatkitUsers = this.findChatkitUsers.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.chatkit.roomUsers.length > 0){
			let currentRoomUsers = this.state.currentRoom.users || []
			let users = nextProps.chatkit.roomUsers || this.props.chatkit.roomUsers
			let userNames = users.map((user) => {
				return user.name
			})
			let userIds = users.map((user) => {
				return user.id
			})
			if(users.length >= currentRoomUsers.length){
				for(var i = 0; i < currentRoomUsers.length; i++){
					let currentRoomUserIndex = userIds.indexOf(currentRoomUsers[i].id)
					if(currentRoomUserIndex >= 0){
						currentRoomUsers[i].name = userNames[currentRoomUserIndex]	
					}
				}
				this.setState({
					roomUsers: currentRoomUsers
				})
			}
		}
	}

	componentWillMount(){
		if(this.props.chatkit.refinedUser){
			this.setState({
				currentUser: this.props.chatkit.refinedUser
			})
		}
	}

	componentDidMount(){
		this.initiateChatkit()
	}

	initiateChatkit = () => {
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

				//get refined user
				this.props.getRefinedUser(currentUser)

				//get all rooms
				this.getRooms()

				// if the user is returning to the chat, direct them to the room they last visited
				if(this.props.chatkit.lastRoom.id > 0){
					this.redirectToLastRoom()
				}	
			})
	}

	sendMessage = (text) => {
		this.state.currentUser.sendMessage({
			roomId: this.props.chatkit.lastRoom.id,
			text: text
		})
		.catch((errors) => {
			//get rooms again if trying to send a message in a room that no longer exists
			if(errors.statusCode !== 422){
				this.getRooms()
				this.setState({
					messages: [],
					currentRoom: {}
				})
			}
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

	findChatkitUsers = () => {
		this.getRooms()
		//store currentRoom in redux state
		this.props.recordLastRoom(this.state.currentRoom)
		//wait for room messages to load then create an array of the senderIds
		let messageIds = this.state.messages.map((message) => {
			return message.senderId
		})
		if(Object.keys(this.state.currentRoom).length > 0){
			let roomUserIds = this.state.currentRoom.users.map((user) => {
				return user.id
			})
			let ids = [...messageIds, ...roomUserIds]
			let userIds = ids.filter((id, pos) => {
				return ids.indexOf(id) === pos
			})
			let userData = {
				userIds: userIds
			}
			this.props.getChatkitUsers(userData)	
		}		
	}

	redirectToLastRoom = () => {
		setTimeout(() => {
			let joinedRooms = this.state.joinedRooms
			let lastRoom = this.props.chatkit.lastRoom
			let joinedRoomsIds = joinedRooms.map((room) => {
				return room.id
			})
			//check if room still exists
			if(joinedRoomsIds.includes(lastRoom.id)){
				this.subscribeToRoom(lastRoom.id)
			} else {
				this.props.clearRoom()
			}
		}, 200)		
	}

	subscribeToRoom = (roomId) => {
		this.setState({
			messages: []
		})
		this.state.currentUser.subscribeToRoom({
			roomId: roomId,
			messageLimit: 100,
			hooks: {
				onNewMessage: (message) => {
					//give component some time to update its state before we get the messages from the API
					setTimeout(() => {
						if(message.room.id === this.state.currentRoom.id){
								this.setState({
									messages: [...this.state.messages, message]
								})						
							}
					}, 200)

				},
				onUserStartedTyping: (currentUser) => {
					this.findChatkitUsers()
					let currentRoomId = this.state.currentRoom.id
					let typingUser = currentUser.id
					let currentRoomUsers = this.props.chatkit.roomUsers
					let currentRoomUsersIds = currentRoomUsers.map((user) => {
						return user.id
					})
					let typingUserIndex = currentRoomUsersIds.indexOf(typingUser)
					//check if the typing user is currently in our room
					if(typingUserIndex >= 0 && currentRoomId == currentRoomUsers[typingUserIndex].lastChatRoom){
						this.setState({
							usersWhoAreTyping: [...this.state.usersWhoAreTyping, currentUser.name]
						})
					}
				},
				onUserStoppedTyping: (currentUser) => {
					this.setState({
						usersWhoAreTyping: this.state.usersWhoAreTyping.filter((user) => {
							return user !== currentUser.name
						})
					})
				},
				onUserCameOnline: () => {
					this.forceUpdate()
					this.findChatkitUsers()
				},
				onUserWentOffline: () => {
					this.forceUpdate()
					this.findChatkitUsers()
				},
				onUserJoined: () => {
					this.forceUpdate()
					this.findChatkitUsers()
				}
			}			
		})
		.then((currentRoom) => {
			this.setState({
				currentRoom: currentRoom
			})
			this.getRooms()
			//store currentRoom in redux state
			this.props.recordLastRoom(currentRoom)
			//wait for room messages to load then create an array of the senderIds
			let messageIds = this.state.messages.map((message) => {
				return message.senderId
			})
			let roomUserIds = this.state.currentRoom.users.map((user) => {
				return user.id
			})
			let ids = [...messageIds, ...roomUserIds]
			let userIds = ids.filter((id, pos) => {
				return ids.indexOf(id) === pos
			})
			let userData = {
				userIds: userIds
			}
			this.props.getChatkitUsers(userData)
		})
		.catch((errors) => {
			this.setState({
				errors: errors
			})
			this.getRooms()
			this.setState({
				messages: [],
				currentRoom: {}
			})
		})
	}

	createRoom = (roomName) => {
		//update list of all rooms before you create a new one
		this.getRooms()
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
		return(
			<div style={{ display: "flex", fontFamily: "Montserrat", height: "90vh", marginTop: "-25px", marginBottom: "-48px"}}>
				<div 
					className="d-none d-md-flex col-md-2 bg-dark p-0" 
					style={{display: "flex", flexDirection: "column", height: "90vh", padding: "24px 24px 0px"}}
				>
					<div style={{flex: "1"}} className="p-4">
						{ this.state.roomUsers.length > 0 && <WhosOnlineList users={this.state.roomUsers}/>}
						<RoomList
							roomId={this.state.currentRoom.id} 
							rooms={[...this.state.joinedRooms, ...this.state.joinableRooms]}
							subscribeToRoom={this.subscribeToRoom}
						/>
					</div>
					<NewRoomForm createRoom={this.createRoom} user={this.state.currentUser}/>
				</div>

				<div 
					className="col-md-10 p-0" 
					style={{display: "flex", flexDirection: "column", height: "90vh"}}
				>
					<div className="mb-3">
						{ this.state.currentRoom.name ? (
							<h4 
								className="room-title text-light m-0" 
								style={{padding: "1.0rem 1.2rem"}}
							>
								{this.state.currentRoom.name}
							</h4>
							) : ( 
							this.props.chatkit.lastRoom.id > 0 ) ? ( 
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
		recordLastRoom: (lastRoom) => {
			dispatch(recordLastRoom(lastRoom))
		},
		clearRoom: () => {
			dispatch(clearRoom())
		},
		getRefinedUser: (user) => {
			dispatch(getRefinedUser(user))
		},
		getChatkitUsers: (userData) => {
			dispatch(getChatkitUsers(userData))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)