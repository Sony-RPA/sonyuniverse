import React from "react"

const Footer = () => {
	return(
		<footer 
			className="bg-dark text-white mt-5 p-4 text-center"
			style={{fontFamily: "Teko"}}
		>
			&copy; {new Date().getFullYear()} Sony Corporation. All rights reserved.
		</footer>
	)
}

export default Footer