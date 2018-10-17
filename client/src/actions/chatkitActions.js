import axios from "axios"
import { clearErrors } from "./postActions"

export const createChatkitUser = (userData, history) => {
	return (dispatch) => {
		axios.post("/api/channels/create-user", userData)
			.then((res) => {
				dispatch({
					type: "START_CHAT",
					payload: res.data
				})
				dispatch(clearErrors())
			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}
}

export const getCurrentRoom = (currentRoom) => {
	return{
		type: "GET_CURRENT_ROOM",
		payload: currentRoom
	}
}