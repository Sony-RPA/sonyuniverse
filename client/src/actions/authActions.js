import axios from "axios"
import setAuthToken from "../utils/setAuthToken"
import jwt_decode from "jwt-decode"

//register user
export const registerUser = (userData, history) => {
	return (dispatch) => {
		//axios makes a request to the route and passes in data to be used as the req.body
		axios.post("/api/users/register", userData)
			.then((res) => {
				history.push("/login")
			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}
}

//login user
export const loginUser = (userData) => {
	return (dispatch) => {
		axios.post("/api/users/login", userData)
			.then((res) => {
				//save to localStorage
				const token = res.data.token
				//set token to localStorage
				localStorage.setItem("jwtToken", token)
				//set token to auth header
				setAuthToken(token)
				//Decode token to get user data
				const decoded = jwt_decode(token)
				//Set current user, dispatch the setCurrentUser actionCreator 
				dispatch(setCurrentUser(decoded))

			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}

}

//update avatar
export const updateAvatar = (avatar) => {
	return (dispatch) => {
		axios.post("/api/users/avatar", avatar)
			.then((res) => {
				dispatch({
					type: "SET_AVATAR",
					payload: avatar.avatar
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

//set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: "SET_CURRENT_USER",
		payload: decoded
	}
}

//log out user
export const logoutUser = () => {
	return (dispatch) => {
		//remove token from local storage
		localStorage.removeItem("jwtToken")
		//remove auth header for future requests
		setAuthToken(false)
		//set current user to {} which will set isAuthenticated to false
		dispatch(setCurrentUser({}))
	}
}