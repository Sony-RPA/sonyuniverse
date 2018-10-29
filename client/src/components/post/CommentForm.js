import React from "react"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import { connect } from "react-redux"
import { addComment } from "../../actions/postActions"


class CommentForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			text: "",
			errors: {}
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			})
		}
	}

	onSubmit = (event) => {
		event.preventDefault()

		const user = this.props.auth.user

		const postId = this.props.postId 

		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		}

		this.props.addComment(postId, newComment)

		this.setState({
			text: ""
		})

	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	render(){
		const errors = this.state.errors
		return(
          <div className="post-form mb-3 shadow">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Make a comment...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup
                    	placeholder="Reply to post"
                    	name="text"
                    	value={this.state.text}
                    	onChange={this.onChange}
                    	error={errors.text}
                    	errorProfile={errors.profilenotfound}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">Submit</button>
                </form>
              </div>
            </div>
          </div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		errors: state.errors,
		auth: state.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		addComment: (postId, commentData) => {
			dispatch(addComment(postId, commentData))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)