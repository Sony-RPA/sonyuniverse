import React from "react"
import sonyLogo from "./sonylogo.gif"

const Banner = () => {
	return(
		<div style={{backgroundColor: "black", textAlign: "right"}}>
			<div className="container">
				<a href="https://www.sony.net/">
					<img 
						src={sonyLogo}
						style={{height: "36px", width: "73px"}}
					/>
				</a>
			</div>
		</div>
	)
}

export default Banner