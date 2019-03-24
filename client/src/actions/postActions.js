import axios from "axios"

//Add post
export const addPost = (postData) => {
	return (dispatch) => {
		dispatch(clearErrors())
		axios.post("/api/posts", postData)
			.then((res) => {
				dispatch({
					type: "ADD_POST",
					payload: res.data
				})
			})
			.catch((errors) => {
				dispatch({
					type: 'GET_ERRORS',
					payload: errors.response.data
				})
			})
	}
}

//get single post
export const getPost = (id) => {
	return (dispatch) => {
		dispatch(setPostLoading())
		axios.get(`/api/posts/${id}`)
			.then((res) => {
				dispatch({
					type: "GET_POST",
					payload: res.data
				})
			})
			.catch((errors) => {
				dispatch({
					type: "GET_POSTS",
					payload: null
				})
			})
	}
}

//get all the posts
export const getPosts = () => {
	return (dispatch) => {
		dispatch(setPostLoading())
		dispatch(clearErrors())
		axios.get("/api/posts")
			.then((res) => {
				dispatch({
					type: "GET_POSTS",
					payload: res.data
				})
			})
			.catch((errors) => {
				dispatch({
					type: "GET_POSTS",
					payload: null
				})
			})
	}
}

//delete post
export const deletePost = (id) => {
	return (dispatch) => {
		axios.delete(`/api/posts/${id}`)
			.then((res) => {
				dispatch({
					type: "DELETE_POST",
					payload: id
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

//add like
export const addLike = (id) => {
	return (dispatch) => {
		axios.post(`/api/posts/like/${id}`)
			.then((res) => {
				dispatch({
					type: "LIKE_POST",
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

//remove like
export const removeLike = (id) => {
	return (dispatch) => {
		axios.post(`/api/posts/unlike/${id}`)
			.then((res) => {
				dispatch({
					type: "LIKE_POST",
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

//add comment
export const addComment = (postId, commentData) => {
	return (dispatch) => {
		dispatch(clearErrors())
		axios.post(`/api/posts/comment/${postId}`, commentData)
			.then((res) => {
				dispatch({
					type: "GET_POST",
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


//delete comment
export const deleteComment = (postId, commentId) => {
	return (dispatch) => {
		axios.delete(`/api/posts/comment/${postId}/${commentId}`)
			.then((res) => {
				dispatch({
					type: "GET_POST",
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


//edit post
export const editPost = (postId, postData) => {
	return (dispatch, getState) => {
		axios.put(`/api/posts/${postId}`, postData)
			.then((res) => {
				dispatch({
					type: "EDIT_POST",
					payload: res.data
				})
				if(Object.keys(getState().errors).length > 0){
					dispatch(clearErrors())
				}
			})
			.catch((errors) => {
				dispatch({
					type: "GET_ERRORS",
					payload: errors.response.data
				})
			})
	}
}

//edit comment
export const editComment = (postId, commentId, commentData) => {
	return (dispatch) => {
		axios.put(`/api/posts/comment/${postId}/${commentId}`, commentData)
			.then((res) => {
				dispatch({
					type: "EDIT_COMMENT",
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

//set loading state
export const setPostLoading = () => {
	return{
		type: "POST_LOADING"
	}
}

//clear errors
export const clearErrors = () => {
	return{
		type: "CLEAR_ERRORS"
	}
}