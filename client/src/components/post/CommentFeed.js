import React from "react"
import CommentItem from "./CommentItem"

class CommentFeed extends React.Component{
	render(){
		//properties passed down when initializing this component inside a higher-order component (Post)
		const comments = this.props.comments
		const postId = this.props.postId

		return(
			comments.map((comment) => {
				return <CommentItem key={comment._id} comment={comment} postId={postId} />
			})
		)
	}
}

export default CommentFeed