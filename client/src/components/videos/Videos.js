import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getVideos } from "../../actions/videoActions"
import VideoFeed from "./VideoFeed"
import VideoFavorites from "./VideoFavorites"
import Toolbar from "./Toolbar"
import Spinner from "../common/Spinner"
import SearchBar from "../common/SearchBar"

const Videos = ({ videos, getVideos }) => {
	//get videos on mount
	useEffect(() => {
		getVideos()
	}, [])

	const { videos: allVideos, loading } = videos
	let videoContent

	if(allVideos == null || loading){
		videoContent = <Spinner/>
	} else {
		videoContent = <VideoFeed videos={allVideos}/>
	}

	return (
		<div className="feed">
			<div className="container">
				<SearchBar/>
				<div className="row">
					<div className={!allVideos || loading ? "col-md-12" : "col-md-9"}>
						{videoContent}
					</div>
					<div className={!allVideos || loading ? "d-none" :"col-md-3" }>
						<div className="card card-body mb-3 shadow pb-2">
							<Toolbar/>
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		videos: state.video
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getVideos: () => {
			dispatch(getVideos())
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Videos)