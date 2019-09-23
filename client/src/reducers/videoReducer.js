const initialState = {
	videos: [],
	video: {},
	loading: false,
	commentLoading: false
}

const videoReducer = (state = initialState, action) => {
	switch(action.type){
		case "GET_VIDEOS":
			return {
				...state,
				videos: action.payload,
				loading: false
			}
		case "GET_VIDEO":
			return {
				...state,
				video: action.payload,
				loading: false
			}
		case "VIDEO_LOADING":
			return {
				...state,
				loading: true
			}
		case "UPLOAD_VIDEO":
			return {
				...state,
				video: action.payload,
				videos: [action.payload, ...state.videos]
			}
		case "CONFIRM_VIDEO":
			return {
				...state,
				video: action.payload,
				videos: state.videos.map((video) => {
					if(video._id === action.payload._id){
						return {
							...video,
							readyForReview: true
						}
					} else {
						return video
					}
				})
			}
		case "ADD_RATING":
			return {
				...state,
				video: action.payload
			}
		case "COMMENT_LOADING":
			return {
				...state,
				commentLoading: true
			}
		case "ADD_COMMENT":
			return {
				...state,
				commentLoading: false,
				video: action.payload
			}
		case "DELETE_COMMENT":
			return {
				...state,
				video: action.payload
			}
		case "DELETE_VIDEO":
			return {
				...state,
				video: {},
				videos: state.videos.filter((video) => video._id !== action.payload._id )
			}
		case "DISABLE_LOADING":
			return {
				...state,
				commentLoading: false
			}
		case "SET_VIEWS":
			return {
				...state,
				videos: state.videos.map((video) => {
					if(video._id === action.payload._id){
						return {
							...video,
							views: action.payload.views
						}
					} else {
						return video
					}
				}),
				video: action.payload
			}
		default:
			return state
	}
}

export default videoReducer