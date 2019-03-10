import React from "react"
import { connect } from "react-redux"
import { editComment, deleteComment } from "../../actions/postActions"
import { Link } from "react-router-dom"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"

class CommentItem extends React.Component{
	constructor(props){
		super(props)

    this.state = {
      editting: false,
      text: this.props.comment.text,
      errors: null
    }

		this.onDeleteClick = this.onDeleteClick.bind(this)
	}

  toggleEdit = () => {
    this.setState((prevState) => {
      return {
        editting: !prevState.editting
      }
    })
  }

  onEditCommentChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  onEditCommentSubmit = () => {
    const postId = this.props.postId
    const commentId = this.props.comment._id
    const commentData = {
      text: this.state.text
    }

    if(commentData.text.length < 2){
      this.setState({
        errors: "Post must be between 2 and 500 characters"
      })
    } else {
      this.props.editComment(postId, commentId, commentData)
      this.toggleEdit()
    }
  }

  onCancelClick = () => {
    this.setState((prevState) => {
      return {
        editting: !prevState.editting,
        text: this.props.comment.text
      }
    })
  }

  onDeleteClick = (postId, commentId) => {
    this.props.deleteComment(postId, commentId)
  }

	render(){
		const { comment, postId, auth } = this.props
    const editting = this.state.editting
		return(
            <div className="card card-body mb-3 shadow">
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
                  { editting ? (
                    <TextAreaFieldGroup
                      value={this.state.text}
                      onChange={this.onEditCommentChange}
                      error={this.state.errors}
                    />
                  ) : (
                    <p className="lead">
                      {comment.text}
                    </p>
                  )}
                  {comment.user === auth.user.id ? (
                    editting ? (
                      <span>
                        <button
                          className="btn btn-success mr-1"
                          onClick={this.onEditCommentSubmit}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary mr-1"
                          onClick={this.onCancelClick}
                        >
                          Cancel
                        </button>                     
                      </span>
                    ) : (
                      <span>
                        <button
                          className="btn btn-secondary mr-1"
                          onClick={this.toggleEdit}
                        >
                          Edit
                        </button>                 
                      </span>
                    )
                  ) : null }
                  { comment.user === auth.user.id ? (
                    <button
                      onClick={() => {
                        this.onDeleteClick(postId, comment._id)
                      }}
                      type="button"
                      className="btn btn-danger mr-1"
                    >
                      <span><i className="fas fa-times"/></span>
                    </button>                    
                  ) : null}
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
    editComment: (postId, commentId, commentData) => {
      dispatch(editComment(postId, commentId, commentData))
    },
		deleteComment: (postId, commentId) => {
			dispatch(deleteComment(postId, commentId))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentItem)