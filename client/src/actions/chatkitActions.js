import axios from "axios"
import { clearErrors } from "./postActions"

export const createChatkitUser = (userData) => {
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

export const getLastRoom = (lastRoom) => {
	return{
		type: "GET_LAST_ROOM",
		payload: lastRoom
	}
}

export const getRefinedUser = (user) => {
	return{
		type: "GET_REFINED_USER",
		payload: user
	}
}

export const clearRoom = () => {
	return{
		type: "CLEAR_ROOM"
	}
}