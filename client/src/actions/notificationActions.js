import axios from "axios"

export const getNotifications = () => {
	return (dispatch) => {
		axios.get("/api/notification")
			.then((res) => {
				dispatch({
					type: "GET_NOTIFICATIONS",
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

export const updateNotification = (notificationId) => {
	return (dispatch) => {
		axios.put(`/api/notification/${notificationId}`)
			.then((res) => {
				dispatch({
					type: "UPDATE_NOTIFICATION",
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