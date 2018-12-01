import axios from "axios"

export const startConversation = (users) => {
	return (dispatch) => {
		axios.post("/api/conversations", users)
			.then((res) => {
				dispatch({
					type: "START_CONVERSATION",
					payload: res.data
				})
			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}
}


export const createMessage = (conversationId, messageData) => {
	return (dispatch) => {
		axios.post(`/api/conversation/${conversationId}`, messageData)
			.then((res) => {
				dispatch({
					type: "CREATE_MESSAGE",
					payload: res.data
				})
			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}
}
