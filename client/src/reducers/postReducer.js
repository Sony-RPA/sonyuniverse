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
		case "EDIT_POST":
			return {
				...state,
				posts: state.posts.map((post) => {
					if(post._id == action.payload._id){
						return {
							...post,
							...action.payload
						}
					} else {
						return post
					}
				})
			}
		case "EDIT_COMMENT":
			return {
				...state,
				posts: state.posts.map((post) => {
					if(post._id == action.payload._id){
						return {
							...post,
							...action.payload
						}
					} else {
						return post
					}
				}),
				post: action.payload
			}
		case "ADD_FAVORITE":
			return {
				...state,
				posts: state.posts.map((post) => {
					if(post._id == action.payload._id){
						return {
							...post,
							...action.payload
						}
					} else {
						return post
					}
				})
			}
		case "REMOVE_FAVORITE":
			return {
				...state,
				posts: state.posts.map((post) => {
					if(post._id == action.payload._id){
						return {
							...post,
							...action.payload
						}
					} else {
						return post
					}
				})
			}
		case "GET_FAVORITES":
			return {
				...state,
				posts: action.payload,
				loading: false
			}
		default:
			return state
	}
}

export default postReducer