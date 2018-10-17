const initialState = {
	chatInitialized: false,
	chatUser: {},
	currentRoom: {}
}

const chatkitReducer = (state = initialState, action) => {
	switch(action.type){
		case "START_CHAT":
			return{
				...state,
				chatInitialized: true,
				chatUser: action.payload
			}
		case "GET_CURRENT_ROOM":
			return{
				...state,
				currentRoom: action.payload
			}
		default:
			return state
	}
}

export default chatkitReducer