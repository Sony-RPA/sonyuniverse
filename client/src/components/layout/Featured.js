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

		let salesBanner = windowWidth <= 576 ? (
			<div
				className={ windowWidth <= 576 ? "p-4 d-md-block d-lg-flex sales-banner-sm" : "px-3 py-4 d-md-block d-lg-flex sales-banner-lg"}
			>
				<p 
					className="font-weight-bold pb-2"
					style={windowWidth < 992 ? {margin: "auto 0", fontSize: "26px"}:{margin: "auto 0"}}
				>
					Achievement Unlocked
				</p>
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
			</div>			
		) : (
			<Fade bottom>
				<div
					className={ windowWidth <= 576 ? "p-4 d-md-block d-lg-flex sales-banner-sm" : "px-3 py-4 d-md-block d-lg-flex sales-banner-lg"}
				>
					<Fade bottom>
						<p 
							className="font-weight-bold pb-2"
							style={windowWidth < 992 ? {margin: "auto 0", fontSize: "26px"}:{paddingRight: "25px", margin: "auto 0"}}
						>
							Achievement Unlocked
						</p>
						<p 
							className="font-weight-bold pb-2"
							style={ windowWidth < 992 ? {margin: "auto 0"} : {margin: "auto 0", borderLeft: "1px solid #fff", padding: "0px 25px"}}	
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
			</Fade>
		)
		return(
			<div className="featured">
				<Fade>
					<div
						className={ windowWidth <= 576 ? "featured-sm" : "featured-lg"}
					>								
					</div>
				</Fade>
				{salesBanner}
			</div>			
		)
	}
}

export default Featured