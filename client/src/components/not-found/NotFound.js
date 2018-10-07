import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
	return(
		<div className="container">
			<h1 className="display-4">
				Page Not Found
			</h1>
			<p>Sorry, this page does not exist</p>
			<Link to="/" className="btn btn-md btn-dark">Back</Link>
		</div>
	)
}

export default NotFound