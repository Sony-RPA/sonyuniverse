import React from "react"
import { connect } from "react-redux"
import PostItem from "../posts/PostItem"
import Spinner from "../common/Spinner"
import CommentForm from "./CommentForm"
import CommentFeed from "./CommentFeed"
import { Link } from "react-router-dom"
import { getPost } from "../../actions/postActions"


class Post extends React.Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.props.getPost(this.props.match.params.id)
	}
	render(){
		const { post, loading } = this.props.post
		let postContent;

		if(post === null || loading || Object.keys(post).length === 0){
			postContent = <Spinner/>
		} else {
			postContent = (
				<div>
					<PostItem post={post} showActions={false}/>
					<CommentForm postId={post._id}/>
					<CommentFeed postId={post._id} comments={post.comments}/>
				</div>
			)
		}

		return(
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/feed" className="btn btn-dark mb-3">
								Back to Feed
							</Link>
							{postContent}
						</div>					
					</div>				
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		post: state.post
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		getPost: (id) => {
			dispatch(getPost(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)