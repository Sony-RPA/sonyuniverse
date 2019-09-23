import React from "react"
import { Link, withRouter } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import TextAreaFieldGroup from "../common/TextAreaFieldGroup"
import TagInputGroup from "../common/TagInputGroup"
import Tags from "../common/Tags"
import { uploadVideo } from "../../actions/videoActions"
import { connect } from "react-redux"

class UploadVideo extends React.Component{
	state = {
		urlPath: "",
		title: "",
		description: "",
		tagsValue: "",
		tags: [],
		errors: {}
	}

	handleOnChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleContainerClick = () => {
		const { tags, tagsValue } = this.state

		if(tagsValue.trim().length > 0){
			const parsedValue = tagsValue.toLowerCase()

			this.setState({
				tagsValue: "",
				tags: [...tags, parsedValue]
			})
		}
	}

	handleTagValueChange = (e) => {
		const { value } = e.target
		const lastCharacter = value[value.length - 1]

		if((lastCharacter === " " || lastCharacter === ",") && value.trim().length > 1){
			const parsedValue = value.slice(0, value.length - 1).trim().toLowerCase()

			this.setState({
				tagsValue: "",
				tags: [...this.state.tags, parsedValue]
			})
		} else {
			this.setState({
				tagsValue: e.target.value
			})
		}
	}

	handleRemoveTag = (index) => {
		const tagsCopy = [...this.state.tags]

		tagsCopy.splice(index, 1)

		this.setState({
			tags: tagsCopy
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { title, description, urlPath, tags } = this.state


		let videoData = {
			title: title,
			description: description,
			urlPath: urlPath,
			tags: tags
		}

		this.props.uploadVideo(videoData, this.props.history)
	}

	componentDidUpdate(prevProps){
		if(prevProps.errors !== this.props.errors){
			this.setState({
				errors: this.props.errors
			})
		}
	}

	renderForm = () => {
		const { urlPath, title, description, errors, tagsValue, tags } = this.state

		return (
			<form onSubmit={this.handleSubmit}>
				<TextFieldGroup
					placeholder="* Title"
					name="title"
					value={title}
					onChange={this.handleOnChange}
					error={errors.title}
					info="A noteworthy title for your viewers"
				/>
				<TextFieldGroup
					placeholder="* YouTube URL Address"
					name="urlPath"
					value={urlPath}
					onChange={this.handleOnChange}
					error={errors.urlPath}
					info="The direct link to the video as seen on YouTube"
				/>
				<TextAreaFieldGroup
					placeholder="* Description"
					name="description"
					value={description}
					onChange={this.handleOnChange}
					error={errors.description}
					info="Write something you would like to say about this video"
				/>
				<TagInputGroup
					value={tagsValue}
					name="tagsValue"
					onChange={this.handleTagValueChange}
					onContainerClick={this.handleContainerClick}
					removeTag={this.handleRemoveTag}
					placeholder="e.g (sports news politics)"
					tags={tags}
					maxTags={7}
					info="Add tags to make your video easier to find. Complete a tag by typing a comma or space or clicking into the box."
				>
					<Tags 
						tags={tags} 
						removeTag={this.handleRemoveTag}
						clickable={true}
					/>
				</TagInputGroup>													
				<input 
					type="submit" value="Upload" 
					className="su-button my-5" style={{background: "#17a2b8"}}
				/>
			</form>
		)
	}

	render(){
		return(
			<div className="upload-video">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/videos" className="btn btn-dark mb-3">
								Go Back
							</Link>						
							<h2 
								className="bg-black text-light text-center mb-4 p-2 shadow"
							>
								Upload Video
							</h2>
							<small className="d-block pb-3">* = required fields</small>
							{this.renderForm()}							
						</div>
					</div>
				</div>

			</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		errors: state.errors
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		uploadVideo: (videoData, history) => {
			dispatch(uploadVideo(videoData, history))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UploadVideo))