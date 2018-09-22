import React from "react"
import { connect } from "react-redux"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import { addPost } from "../../actions/postActions"

class PostForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			text: "",
			errors: {}
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	componentWillReceiveProps(newProps){
		if(newProps.errors){
			this.setState({
				errors: newProps.errors
			})
		}
	}

	onSubmit = (event) => {
		event.preventDefault()
		
		const user = this.props.auth.user

		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		}

		this.props.addPost(newPost)
		this.setState({
			text: ""
		})
	}

	render(){
		const errors = this.state.errors
		return(
          <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Say Something...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextAreaFieldGroup
                    	placeholder="Create a post"
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
		addPost: (postData) => {
			dispatch(addPost(postData))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)