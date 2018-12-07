import isEmpty from "../validation/is-empty"


const initialState = {
	isAuthenticated: false,
	user: {}
}

const authReducer = (state = initialState, action) => {
	switch(action.type){
		case "CREATE_USER":
			return {
				...state,
				user: action.payload
			}
		case "SET_CURRENT_USER":
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			}
		case "SET_AVATAR":
			return{
				...state,
				user: {
					...state.user,
					avatar: action.payload
				}
			}
		case "AUTHENTICATION_PASSWORD_RESET_HASH_CREATED": {
			return{
				...state,
				isPasswordReset: true
			}
		}
		default:
			return state
	}
}

export default authReducer