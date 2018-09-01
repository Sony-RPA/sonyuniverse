import axios from "axios"


//get current profile
export const getCurrentProfile = () => {
	return (dispatch) => {
		dispatch(setProfileLoading())
		axios.get("/api/profile")
			.then((res) => {
				dispatch({
					type: "GET_PROFILE",
					payload: res.data
				})
			})
			.catch((errors) => {
				dispatch({
					type: "GET_PROFILE",
					payload: {}
				})
			})
	}
}

//get profile by handle
export const getProfileByHandle = (handle) => {
	return (dispatch) => {
		dispatch(setProfileLoading())
		axios.get(`/api/profile/handle/${handle}`)
			.then((res) => {
				dispatch({
					type: "GET_PROFILE",
					payload: res.data
				})
			})
			.catch((errors) => {
				dispatch({
					type: "GET_PROFILE",
					payload: null
				})
			})
	}
}

//profile loading
export const setProfileLoading = () => {
	return{
		type: "PROFILE_LOADING"
	}
}

//clear profile
export const clearCurrentProfile = () => {
	return{
		type: "CLEAR_CURRENT_PROFILE"
	}
}

//create profile
export const createProfile = (profileData, history) => {
	return (dispatch) => {
		axios.post("/api/profile", profileData)
			.then((res) => {
				history.push("/dashboard")
			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}
}

//add experience
export const addExperience = (expData, history) => {
	return (dispatch) => {
		axios.post("/api/profile/experience", expData)
			.then((res) => {
				history.push("/dashboard")
			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}
}

//add education
export const addEducation = (eduData, history) => {
	return (dispatch) => {
		axios.post("/api/profile/education", eduData)
			.then((res) => {
				history.push("/dashboard")
			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}
}

//delete experience
export const deleteExperience = (id) => {
	return (dispatch) => {
		axios.delete(`/api/profile/experience/${id}`)
			.then((res) => {
				dispatch({
					type: "GET_PROFILE",
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

//delete education
export const deleteEducation = (id) => {
	return (dispatch) => {
		axios.delete(`/api/profile/education/${id}`)
			.then((res) => {
				dispatch({
					type: "GET_PROFILE",
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

//get profiles
export const getProfiles = () => {
	return (dispatch) => {
		dispatch(setProfileLoading())
		axios.get("/api/profile/all")
			.then((res) => {
				dispatch({
					type: "GET_PROFILES",
					payload: res.data
				})
			})
			.catch((errors) => {
				dispatch({
					type: "GET_PROFILES",
					payload: null
				})
			})
	}
}

//delete account
export const deleteAccount = () => {
	return (dispatch) => {
		if(window.confirm("Are you sure? This can NOT be undone!")){
			axios.delete("/api/profile")
			.then((res) => {
				dispatch({
					type: "SET_CURRENT_USER",
					payload: {}
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
}