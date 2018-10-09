import React from "react"
import { Link } from "react-router-dom"

const ProfileActions = () => {
	return(
		<div className="btn-group mb-5" role="group">
			<Link to="/edit-profile" className="btn btn-dark bg-black">
				<i className="fas fa-user-circle text-info mr-1"></i>
				Edit Profile
			</Link>
			<Link to="/edit-avatar" className="btn btn-dark bg-black">
				<i className="fas fa-camera text-info mr-1"></i>
				Edit Avatar
			</Link>			
			<Link to="/add-experience" className="btn btn-dark bg-black">
				<i className="fab fa-black-tie text-info mr-1"></i>
				Add Experience
			</Link>			
			<Link to="/add-education" className="btn btn-dark bg-black">
				<i className="fas fa-graduation-cap text-info mr-1"></i>
				Add Education
			</Link>			
		</div>
	)
}

export default ProfileActions
