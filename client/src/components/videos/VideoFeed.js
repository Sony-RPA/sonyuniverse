import React from "react"
import VideoItem from "./VideoItem"

const VideoFeed = ({ videos }) => {
	return videos.map((video) => {
		return <VideoItem key={video._id} video={video} />
	})
}

export default VideoFeed