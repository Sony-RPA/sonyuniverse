import axios from "axios"

export const getColleagues = () => {
	return (dispatch) => {
		axios.get("/api/colleagues")
			.then((res) => {
				dispatch({
					type: "GET_COLLEAGUES",
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

export const addColleague = (newColleagueId) => {
	return (dispatch) => {
		axios.post(`/api/colleagues/${newColleagueId}`)
			.then((res) => {
				dispatch(getColleagues())
			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}
}

export const acceptColleague = (receivedColleagueId) => {
	return (dispatch) => {
		axios.put(`/api/colleagues/${receivedColleagueId}`)
			.then((res) => {
				dispatch(getColleagues())
			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}
}

export const removeColleague = (removedColleagueId) => {
	return (dispatch) => {
		axios.delete(`/api/colleagues/${removedColleagueId}`)
			.then((res) => {
				dispatch(getColleagues())
			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}
}