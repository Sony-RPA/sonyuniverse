import React from "react"
import redDeadHero from "../../img/red-dead.png"
import redDeadLogo from "../../img/red-dead-logo.png"
import { Fade } from "react-reveal"


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
			<div className="featured" style={windowWidth === 1024 ? {height: "45vh"} : {height: "65vh"}}>
				<div className="container">			
					<div className="imageContainer">
						<Fade delay={500}>					
							<img 
								src={redDeadHero} 
								style={windowWidth >= 768 ? {width: "auto", position: "absolute", bottom: "0"} : { width: "100%", position: "absolute", bottom: "0", right: "0"}}
							/>
						</Fade>											
					</div>
					<div className="text-center">
						<img 
							src={redDeadLogo} 
							style={windowWidth > 900 ? {width: "auto", position: "absolute", bottom: "0"} : { width: "100%", bottom: "0"}}
						/>
					</div>
					<div 
						className="w-50 text-right d-none d-md-block"
						style={windowWidth === 768 ? 
							{position: "relative", right: "-15px", top: "38px", fontSize: "23px", fontFamily: "Source Sans Pro", marginLeft: "auto", zIndex: "-1"} :
							{position: "relative", right: "60px", top: "200px", fontSize: "24px", fontFamily: "Source Sans Pro", marginLeft: "auto", zIndex: "-1"}
						}
					>
						<p className="text-left">
							"Stands shoulder-to-shoulder with Grand Theft Auto V as one of the greatest games of the modern age"
						</p>
						<p className="text-right pr-4">- IGN</p>
					</div>
					<div className="text-center">
						<a 
							href="https://www.playstation.com/en-us/games/red-dead-redemption-2-ps4/"
							className="btn btn-lg btn-primary rounded-0"
							style={windowWidth === 768 ? {position: "relative", top: "60px", left: "250px"} : {position: "relative", top: "200px", left: "90px"}}
						>
							Buy Now
						</a>
					</div>					
				</div>
			</div>			
		)
	}
}

export default Featured