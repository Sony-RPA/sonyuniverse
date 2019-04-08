import React from "react"
import { connect } from "react-redux"
import PostForm from "./PostForm"
import PostFeed from "./PostFeed"
import Spinner from "../common/Spinner"
import { getPosts, getRelatedPosts } from "../../actions/postActions"
import SearchBar from "../common/SearchBar"

class Posts extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			text: ""
		}
	}

	handleOnChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleOnSubmit = (event) => {
		event.preventDefault()
		const text = this.state.text
		if(text.length > 0){
			this.props.getRelatedPosts(text)
		} else {
			this.props.getPosts()
		}
	}

	componentDidMount(){
		this.props.getPosts()
	}

	render(){
		const { posts, loading } = this.props.post
		let postContent;

		if(posts === null || loading){
			postContent = <Spinner/>
		} else{
			postContent = <PostFeed posts={posts}/>
		}

		return(
			<div className="feed" style={{minHeight: "100vh"}}>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<SearchBar
								text={this.state.text}
								handleOnChange={this.handleOnChange}
								handleOnSubmit={this.handleOnSubmit}
							/>
							<PostForm/>
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
		getPosts: () => {
			dispatch(getPosts())
		},
		getRelatedPosts: (text) => {
			dispatch(getRelatedPosts(text))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)