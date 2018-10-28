const initialState = {
	chatInitialized: false,
	chatUser: {},
	currentRoom: {},
	refinedUser: {},
	roomUsers: []
}

const chatkitReducer = (state = initialState, action) => {
	switch(action.type){
		case "START_CHAT":
			return{
				...state,
				chatInitialized: true,
				chatUser: action.payload
			}
		case "RECORD_LAST_ROOM":
			return{
				...state,
				currentRoom: action.payload
			}
		case "CLEAR_ROOM":
			return{
				...state,
				currentRoom: {}
			}
		case "GET_REFINED_USER":
			return{
				...state,
				refinedUser: action.payload
			}
		case "GET_CHAT_USERS":
			return{
				...state,
				roomUsers: action.payload
			}
		default:
			return state
	}
}

export default chatkitReducer