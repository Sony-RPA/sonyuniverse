const initialState = {}

const conversationReducer = (state = initialState, action) => {
	switch(action.type){
		case "START_CONVERSATION":
			return action.payload
		case "CREATE_MESSAGE":
			return {
				...state,
				messages: action.payload.messages
			}
		default:
			return state
	}
}

export default conversationReducer