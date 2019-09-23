import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { deletePost, addLike, removeLike, editPost, addFavorite, removeFavorite } from "../../actions/postActions"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import formatTimestamp from "../../utils/formatTimestamp"

class PostItem extends React.Component{
	constructor(props){
		super(props)

    this.state = {
      text: this.props.post.text,
      editting: false,
      errors: null
    }

		this.onDeleteClick = this.onDeleteClick.bind(this)
		this.onLikeClick = this.onLikeClick.bind(this)
	}

	onDeleteClick = (id) => {
		this.props.deletePost(id)
	}

	onLikeClick = (id) => {
		this.props.addLike(id)
	}

	onRemoveLike = (id) => {
		this.props.removeLike(id)
	}

	findUserLike = (likes) => {
		const auth = this.props.auth
		if(likes.filter(like => like.user === auth.user.id).length > 0){
      return true
      } else{
        return false
      }
	}

  toggleEdit = () => {
    this.setState((prevState) => {
      return {
        editting: !prevState.editting
      }
    })
  }

  onEditPostChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  onCancelClick = () => {
    this.setState((prevState) => {
      return {
        editting: !prevState.editting,
        text: this.props.post.text,
        errors: null
      }
    })
  }

  onEditPostSubmit = () => {
    const postId = this.props.post._id
    const postData = {
      text: this.state.text
    }
    if(postData.text.length < 2){
      this.setState({
        errors: "Post must be between 2 and 500 characters"
      })
    } else {
      this.props.editPost(postId, postData)
      this.toggleEdit()
    }
  }

  onToggleFavorite = (id) => {
    const favoriters = this.props.post.favoriters

    //remove user from list if they already exist
    if(this.findUserFavorite(favoriters)){
      this.props.removeFavorite(id)
    //add user to list
    } else {
      this.props.addFavorite(id)
    }
  }

  findUserFavorite = (favoriters) => {
    const auth = this.props.auth
     if(favoriters.filter((favoriter) => favoriter.user === auth.user.id).length > 0){
       return true
     } else {
       return false
     }
  }

	render(){
		const post = this.props.post
		const auth = this.props.auth
    const showActions = this.props.showActions
    const editting = this.state.editting
		return(
            <div className="card card-body mb-3 shadow">
              <div className="row">
                <div className="col-md-3 text-center">
                  <Link to={`/profile/${post.handle}`}>
                    <img 
                    	className="rounded-circle d-none d-md-block avatar m-auto" 
                    	src={post.avatar}
                      alt="" 
                    />
                  </Link>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-9 py-2 px-0">
                  <div className="text-left mb-2">
                    <small className="text-secondary">{formatTimestamp(post.date)}</small>
                  </div>
                  { editting ? (
                    <TextAreaFieldGroup
                      value={this.state.text}
                      onChange={this.onEditPostChange}
                      error={this.state.errors}
                    />
                  ) : (
                    <p className="lead">{post.text}</p>
                  )}

                  { showActions ? (
                    <span key={Math.random()}>
                      <button 
                        type="button" 
                        className="btn btn-light mr-1"
                        onClick={() => {
                          this.onLikeClick(post._id)
                        }}
                      >
                        <i className={this.findUserLike(post.likes) ? "text-info fas fa-thumbs-up" : "fas fa-thumbs-up"}></i>
                        <span className="badge badge-light">{post.likes.length}</span>
                      </button>

                      <button 
                        type="button" 
                        className="btn btn-light mr-1"
                        onClick={() => {
                          this.onRemoveLike(post._id)
                        }}
                      >
                        <i className="text-secondary fas fa-thumbs-down"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-light mr-1"
                        onClick={() => {
                          this.onToggleFavorite(post._id)
                        }}
                      >
                        <i className={this.findUserFavorite(post.favoriters) ? "text-warning fas fa-star" : "text-warning far fa-star"}></i>
                      </button>

                      { post.user == auth.user.id ? (
                        editting ? (
                          <span>
                          <button
                            className="btn btn-success mr-1"
                            onClick={this.onEditPostSubmit}
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
                          <button
                            className="btn btn-secondary mr-1"
                            onClick={this.toggleEdit}
                          >
                            Edit
                          </button>
                        )
                      ) : null }


                      <Link to={`/posts/${post._id}`} className="btn btn-info mr-1">
                        Comments
                      </Link>

                      { post.user === auth.user.id ? (
                        <button 
                          type="button" 
                          className="btn btn-danger mr-1"
                          onClick={() => {
                            this.onDeleteClick(post._id)
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      ) : null }                      
                    </span>
                    ) : null }
                </div>
              </div>
            </div>
		)
	}
}

PostItem.defaultProps = {
  showActions: true
}


const mapStateToProps = (state) => {
	return{
		auth: state.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		deletePost: (id) => {
			dispatch(deletePost(id))
		},
		addLike: (id) => {
			dispatch(addLike(id))
		},
		removeLike: (id) => {
			dispatch(removeLike(id))
		},
    editPost: (id, postData) => {
      dispatch(editPost(id, postData))
    },
    addFavorite: (id) => {
      dispatch(addFavorite(id))
    },
    removeFavorite: (id) => {
      dispatch(removeFavorite(id))
    }
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(PostItem)