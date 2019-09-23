import React, { useState, useEffect } from "react"
import YouTube from "react-youtube"
import { Fade } from "react-reveal"
import { connect } from "react-redux"
import { setViewCount } from "../../actions/videoActions"
import { Link } from "react-router-dom"
import Tags from "../common/Tags"
import formatTimestamp from "../../utils/formatTimestamp"

const VideoItem = ({ video, setViewCount }) => {
	const [ mounted, setMounted ] = useState(false)
	const [ played, setPlayed ] = useState(false)
	const [ containerWidth, setContainerWidth ] = useState(0)

	const { _id, urlPath, title, description, date, views, user, tags } = video

	const youtubeVideoId = urlPath.slice(urlPath.indexOf("=") + 1)

	const videoContainer = React.createRef()

	useEffect(() => {
		setMounted(true)
		if(videoContainer.current){
			setContainerWidth(videoContainer.current.offsetWidth)
		}		
	}, [])

	useEffect(() => {
		//increase view count. user should only be able to increase count once per page instance.
		if(played){
			setViewCount(_id)
		}
	}, [played])


	const handleOnPlay = () => {
		if(!played){
			setPlayed(true)
		}
	}

	const options = {
		height: "220",
		width: `${containerWidth - 25}`,
		playerVars: {
			autoPlay: 1
		}
	}

	return (
		<div>
			<div className="card card-body mb-3 shadow">
				<div className="row">
					<div 
						className="col-md-6"
						ref={videoContainer}
					>
						{ mounted && (
							<Fade delay={100}>
								<YouTube
									videoId={youtubeVideoId}
									opts={options}
									onPlay={handleOnPlay}
								/>
							</Fade>
						)}
					</div>
					<div className="col-md-6">
						<Link to={`/video/${video._id}`} className="solid-link">
							<h4 className="mb-2">{title}</h4>
							<div className="d-flex mb-3">
								<img src={user.avatar} className="rounded-circle small-avatar mr-2"/>
								<span className="d-flex align-items-center">{user.name}</span>
								<span className="d-flex align-items-center mx-2"><i className="fas fa-dot-circle small-icon"></i></span>
								<small className="text-secondary d-flex align-items-center">{formatTimestamp(date)}</small>
								<span className="d-flex align-items-center mx-2"><i className="fas fa-dot-circle small-icon"></i></span>
								<small className="text-secondary d-flex align-items-center">{views} Views</small>
							</div>
							<p>{description}</p>
							<div className="mt-4">
								<Tags
									tags={tags}
									clickable={false}
								/>
							</div>
						</Link>
					</div>						
				</div>
	    	</div>
		</div>
	)
}


const mapDispatchToProps = (dispatch) => {
	return {
		setViewCount: (videoId) => {
			dispatch(setViewCount(videoId))
		}
	}
}

export default connect(null, mapDispatchToProps)(VideoItem)