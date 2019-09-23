import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import YouTube from "react-youtube"
import Tags from "../common/Tags"
import { setVideoReady, deleteVideo } from "../../actions/videoActions"
import { withRouter, Redirect } from "react-router-dom"

const ConfirmVideo = ({ video, setVideoReady, deleteVideo, history }) => {
	const { _id, urlPath, title, description, date, views, user, tags } = video

	const [ containerWidth, setContainerWidth ] = useState(0)

	const containerRef = React.createRef()

	useEffect(() => {
		if(containerRef.current){
			setContainerWidth(containerRef.current.offsetWidth)
		}
	}, [])	

	if(!Object.keys(video).length){
		return (
			<Redirect to="/videos"/>
		)
	}

	const youtubeVideoId = urlPath.slice(urlPath.indexOf("=") + 1)

	const options = {
		height: "400",
		width: `${containerWidth}`,
		playerVars: {
			autoPlay: 1
		}
	}

	const handleSubmit = () => {
		setVideoReady(_id, history)
	}

	const handleDelete = () => {
		deleteVideo(_id, history)
	}

	return(
		<div className="confirm-video">
			<div className="container">
				<div className="row">
					<div className="col-md-8 px-0 m-auto" ref={containerRef}>
						<h4 className="mt-2 mb-3">{title}</h4>
						<YouTube
							videoId={youtubeVideoId}
							opts={options}
						/>
						<div className="card card-body shadow my-4">
							<p>{description}</p>
							<div className="my-3">
								<Tags
									tags={tags}
									editable={false}
								/>
							</div>
						</div>
						<div className="my-5 text-center">
							<input
								onClick={handleSubmit}
								type="submit" value="Submit" 
								className="su-button" style={{background: "#1ebd76"}}
							/>
							<button
								onClick={handleDelete}
								className="text-danger btn btn-light mt-3"
							>
								Delete <span><i className="fas fa-times-circle"></i></span>
							</button>							
						</div>
					</div>
				</div>
			</div>			
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		video: state.video.video
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setVideoReady: (videoId, history) => {
			dispatch(setVideoReady(videoId, history))
		},
		deleteVideo: (videoId, history) => {
			dispatch(deleteVideo(videoId, history))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ConfirmVideo))