import isEmpty from "../validation/is-empty"


const initialState = {
	isAuthenticated: false,
	user: {}
}

const authReducer = (state = initialState, action) => {
	switch(action.type){
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
			//use object.assign to SET a new property in the state which has not yet been defined
			const newState = Object.assign({}, state)
			newState.isPasswordReset = true
			return newState
		}
		default:
			return state
	}
}

export default authReducer