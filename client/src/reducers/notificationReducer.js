const initialState = {
	notifications: []
}

const notificationReducer = (state = initialState, action) => {
	switch(action.type){
		case "GET_NOTIFICATIONS":
			return {
				notifications: action.payload
			}
		case "UPDATE_NOTIFICATION":
			return {
				notifications: state.notifications.map((notif) => {
					if(notif._id == action.payload._id){
						return {
							...action.payload
						}
					} else {
						return notif
					}
				})
			}
		default:
			return state
	}
}

export default notificationReducer