import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { deletePost, addLike, removeLike } from "../../actions/postActions"

class PostItem extends React.Component{
	constructor(props){
		super(props)

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
		} else {
			return false
		}
	}


	render(){
		const post = this.props.post
		const auth = this.props.auth
    const showActions = this.props.showActions
		return(
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="">
                    <img 
                    	className="rounded-circle d-none d-md-block" 
                    	src={post.avatar}
                      	alt="" 
                      />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{post.text}</p>

                  { showActions ? (
                    <span>
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
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(PostItem)