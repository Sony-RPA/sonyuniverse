import React from "react"
import godOfWar from "../../img/godofwar.jpg"
import { Fade, Zoom } from "react-reveal"


class Featured extends React.Component{
	constructor(){
		super()
		this.state = {
			windowWidth: window.innerWidth
		}
	}

	componentDidMount(){
		window.addEventListener("resize", this.updateWidth)
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.updateWidth)
	}

	updateWidth = () => {
		this.setState({
			windowWidth: window.innerWidth
		})
	}

	render(){
		let windowWidth = this.state.windowWidth
		return(
			<div className="featured">
				<Fade>
					<div style={{height: "80vh", backgroundImage: `url(${godOfWar})`, backgroundSize: "cover"}}>								
					</div>
				</Fade>
				<div
					className="p-5 d-md-block d-lg-flex sales-banner"
					style={{
						background: "rgba(31, 31, 31, 0.9)",
						color: "#fff",
						fontFamily: "Source Sans Pro",
						fontSize: "20px",
						position: "absolute",
						bottom: "0",
						width: "100%"
					}}
				>
					<Fade bottom>
						<p 
							className="font-weight-bold pb-2"
							style={windowWidth < 992 ? {margin: "auto 0", fontSize: "26px"}:{margin: "auto 0"}}
						>
							Achievement Unlocked
						</p>
						<h5 className="mx-3 pb-2 d-none d-lg-flex" style={{margin: "auto 0"}}>|</h5>
						<p 
							className="font-weight-bold pb-2"
							style={{margin: "auto 0"}}	
						>
							Sony Playstation 4's "God of War" wins Game of The Year at "The Game Awards." Bring home this epic tale today.
						</p>
						<div style={{marginLeft: "auto"}}>
							<a 
								href="https://www.playstation.com/en-us/games/god-of-war-ps4/"
								className="sony-btn"
								style={windowWidth < 992 ? {width: "100%", marginTop: "15px"}:{width: "initial"}}
							>Buy Now
							</a>
						</div>
					</Fade>
				</div>
			</div>			
		)
	}
}

export default Featured