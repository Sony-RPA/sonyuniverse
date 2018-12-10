import React from "react"
import sonyLogo from "./sonylogo.gif"

const Banner = () => {
	return(
		<div style={{backgroundColor: "black", textAlign: "right", height: "35px", paddingTop: "5px"}}>
			<div className="container">
				<a href="https://www.sony.net/">
					<img 
						src={sonyLogo}
						style={{height: "25px", width: "85px"}}
					/>
				</a>
			</div>
		</div>
	)
}

export default Banner