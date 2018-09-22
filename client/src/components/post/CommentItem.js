import React from "react"
import { connect } from "react-redux"
import { deleteComment } from "../../actions/postActions"
import { Link } from "react-router-dom"

class CommentItem extends React.Component{
	constructor(props){
		super(props)

		this.onDeleteClick = this.onDeleteClick.bind(this)
	}

	onDeleteClick = (postId, commentId) => {
		this.props.deleteComment(postId, commentId)
	}

	render(){
		const { comment, postId, auth } = this.props
		return(
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <Link to={`/profile/${comment.handle}`}>
                    <img 
                    	className="rounded-circle d-none d-md-block avatar" 
                    	src={comment.avatar} 
                    	alt="" 
                    />
                  </Link> 
                  <br />
                  <p className="text-center">
                  	{comment.name}
                  </p>
                </div>
                <div className="col-md-10">
                  <p className="lead">
                  	{comment.text}
                  </p>
                  {comment.user === auth.user.id ? (
                  	<button
                  		onClick={() => {
                  			this.onDeleteClick(postId, comment._id)
                  		}}
                  		type="button"
                  		className="btn btn-danger mr-1"
                  	>
                  		<i className="fas fa-times"/>
                  	</button>
                  ) : null }
                </div>
              </div>
            </div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		auth: state.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		deleteComment: (postId, commentId) => {
			dispatch(deleteComment(postId, commentId))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)