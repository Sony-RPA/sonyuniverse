const initialState = {
	connected: [],
	requested: [],
	received: [],
	denied: []
}

const colleagueReducer = (state = initialState, action) => {
	switch(action.type){
		case "GET_COLLEAGUES":
			return action.payload
		default:
			return state
	}
}

export default colleagueReducer