import axios from "axios"
import { clearErrors } from "./postActions"

export const createChatkitUser = () => {
	return (dispatch) => {
		axios.post("/api/channels/create-user")
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

export const recordLastRoom = (lastRoom) => {
	axios.post("/api/channels/record-last-room", lastRoom)
		return{
			type: "RECORD_LAST_ROOM",
			payload: lastRoom
		}
}

export const getRefinedUser = (user) => {
	return{
		type: "GET_REFINED_USER",
		payload: user
	}
}

export const getChatkitUsers = (userData) => {
	return (dispatch) => {
		axios.post("/api/channels/users", userData)
			.then((res) => {
				dispatch({
					type: "GET_CHAT_USERS",
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

export const clearRoom = () => {
	return{
		type: "CLEAR_ROOM"
	}
}