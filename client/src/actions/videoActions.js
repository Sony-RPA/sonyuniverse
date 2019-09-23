import axios from "axios"

export const getVideos = () => {
	return async (dispatch) => {
		dispatch(setVideoLoading())

		try {
			const res = await axios.get("/api/videos")

			dispatch({
				type: "GET_VIDEOS",
				payload: res.data
			})
		} catch (errors) {
			dispatch({
				type: "GET_ERRORS",
				payload: errors.response.data
			})
		}
	}
}

export const getVideo = (videoId) => {
	return async (dispatch) => {
		try {

			dispatch(setVideoLoading())

			const res = await axios.get(`/api/video/${videoId}`)

			dispatch({
				type: "GET_VIDEO",
				payload: res.data
			})

		} catch(errors) {
			dispatch({
				type: "GET_ERRORS",
				payload: errors.response.data
			})
		}
	}

}


export const uploadVideo = (videoData, history) => {
	return async (dispatch) => {

		try{
			const res = await axios.post("/api/videos", videoData)

			dispatch({
				type: "UPLOAD_VIDEO",
				payload: res.data
			})

			dispatch({
				type: "CLEAR_ERRORS"
			})

			history.push("/upload-video/confirm")

		} catch(errors) {
			dispatch({
				type: "GET_ERRORS",
				payload: errors.response.data
			})
		}
	}
}

export const setViewCount = (videoId) => {
	return async (dispatch) => {

		try {
			const res = await axios.put(`/api/video/view/${videoId}`)

			dispatch({
				type: "SET_VIEWS",
				payload: res.data
			})

		} catch (errors) {
			dispatch({
				type: "GET_ERRORS",
				payload: errors
			})
		}
	}
}

export const setVideoReady = (videoId, history) => {
	return async (dispatch) => {
		try {
			const res = await axios.put(`/api/videos/confirm/${videoId}`)

			dispatch({
				type: "CONFIRM_VIDEO",
				payload: res.data
			})

			history.push("/videos")

		} catch(errors){
			dispatch({
				type: "GET_ERRORS",
				payload: errors.response.data
			})
		}
	}
}

export const addRating = (videoId, stars) => {
	return async (dispatch) => {
		try {
			const res = await axios.put(`/api/videos/rate/${videoId}`, stars)
			dispatch({
				type: "ADD_RATING",
				payload: res.data
			})
		} catch(errors) {
			dispatch({
				type: "GET_ERRORS",
				payload: errors.response.data
			})
		}
	}
}

export const addComment = (videoId, commentData) => {
	return async (dispatch) => {
		try {

			dispatch(setCommentLoading())

			const res = await axios.post(`/api/videos/comment/${videoId}`, commentData)

			dispatch({
				type: "ADD_COMMENT",
				payload: res.data
			})

			dispatch(clearErrors())

		} catch(errors) {
			dispatch({
				type: "GET_ERRORS",
				payload: errors.response.data
			})

			dispatch(disableVideoLoading())
		}
	}
}

export const deleteComment = (videoId, commentId) => {
	return async (dispatch) => {
		try {
			const res = await axios.delete(`/api/videos/comment/${videoId}/${commentId}`)

			dispatch({
				type: "DELETE_COMMENT",
				payload: res.data
			})

		} catch (errors) {

			dispatch({
				type: "GET_ERRORS",
				payload: errors.response.data
			})
		}
	}
}

export const deleteVideo = (videoId, history) => {
	return async (dispatch) => {
		try {
			const res = await axios.delete(`/api/videos/${videoId}`)

			dispatch({
				type: "DELETE_VIDEO",
				payload: videoId
			})

			history.push("/videos")			

		} catch(errors) {
			dispatch({
				type: "GET_ERRORS",
				payload: errors.response.data
			})
		}
	}
}

export const setCommentLoading = () => {
	return {
		type: "COMMENT_LOADING"
	}
}

export const disableVideoLoading = () => {
	return {
		type: "DISABLE_LOADING"
	}
}

export const setVideoLoading = () => {
	return {
		type: "VIDEO_LOADING"
	}
}

export const clearErrors = () => {
	return{
		type: "CLEAR_ERRORS"
	}
}