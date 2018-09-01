import React from "react"
import PostItem from "./PostItem"

class PostFeed extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		const { posts } = this.props
		return(
			posts.map((post) => {
				return <PostItem key={post._id} post={post}/>
			})
		)
	}
}

export default PostFeed