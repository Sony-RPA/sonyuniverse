import React from "react"
import { Link } from "react-router-dom"

const Toolbar = () => {
	return (
		<div className="mb-3">
			<Link to="/upload-video" className="solid-link d-block mb-3">
				<i className="fas fa-plus mr-3" alt=""></i><span>Upload video</span>
			</Link>
			<Link to="#" className="solid-link d-block mb-3">
				<i className="fas fa-video mr-3" alt=""></i><span>Stream Live</span>
			</Link>
			<Link to="#" className="solid-link d-block mb-3">
				<i className="fas fa-heart mr-3" alt=""></i><span>Favorites</span>
			</Link>
			<Link to="#" className="solid-link d-block mb-3">
				<i className="fas fa-thumbs-up mr-3" alt=""></i><span>Liked videos</span>
			</Link>			
			<Link to="#" className="solid-link d-block mb-3">
				<i className="fas fa-clock mr-3" alt=""></i><span>Watch later</span>
			</Link>
			<Link to="#" className="solid-link d-block">
				<i className="fas fa-cog mr-3" alt=""></i><span>Settings</span>
			</Link>									
		</div>
	)
}

export default Toolbar