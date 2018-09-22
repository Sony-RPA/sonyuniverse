const initialState = {
	posts: [],
	post: {},
	loading: false
}

const postReducer = (state = initialState, action) => {
	switch(action.type){
		case "POST_LOADING":
			return{
				...state,
				loading: true
			}
		case "ADD_POST":
			return{
				...state,
				posts: [action.payload, ...state.posts]
			}
		case "GET_POST":
			return{
				...state,
				post: action.payload,
				loading: false
			}
		case "GET_POSTS":
			return{
				...state,
				posts: action.payload,
				loading: false
			}
		case "DELETE_POST":
			return{
				...state,
				posts: state.posts.filter(post => post._id !== action.payload)
			}
		case "LIKE_POST":
			return{
				...state,
				posts: state.posts.map((post) => {
					if(post._id === action.payload._id){
						return {
							...post,
							...action.payload
						}
					} else {
						return post
					}
				})
			}
		default:
			return state
	}
}

export default postReducer