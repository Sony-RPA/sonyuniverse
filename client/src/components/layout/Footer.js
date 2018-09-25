import React from "react"

const Footer = () => {
	return(
		<footer 
			className="bg-navy text-white mt-5 p-4 text-center"
		>
			&copy; {new Date().getFullYear()} Sony Corporation. All rights reserved.
		</footer>
	)
}

export default Footer