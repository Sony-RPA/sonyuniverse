import React from "react"
import redDeadHero from "../../img/red-dead.png"
import redDeadLogo from "../../img/red-dead-logo.png"
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
				<div className="container">
					<div className="row">			
						<div className="col-md-6 col-lg-6">
							<img 
								src={redDeadHero}
								style={windowWidth < 768 ? {width: "100%"} : {width: "auto"}}
							/>									
						</div>
						<div className="col-md-6 col-lg-6 font-weight-bold">
							<div style={windowWidth <= 768 ? { position: "absolute", bottom: "0" } : {position: "relative"}}>
								<img 
									src={redDeadLogo}
									style={windowWidth <= 768 ? {width: "100%"} : {width: "auto"}}
								/>
								<Fade delay={500}>
									<p 
										className="d-none d-md-block p-2 pt-5"
										style={windowWidth === 768 ? {color: "#fff", textShadow: "1px 1px 1px #000"}:{color: "#000", textShadow: "1px 1px 2px #000"}}
									>
										"Stands shoulder-to-shoulder with Grand Theft Auto V as one of the greatest games of the modern age" &nbsp; <span style={{color: "#f00"}}>-IGN</span>
									</p>
								</Fade>
								<Fade delay={1000}>
								<p 
									className="d-none d-md-block p-2"
									style={windowWidth === 768 ? {color: "#fff", textShadow: "1px 1px 1px #000"}:{color: "#000", textShadow: "1px 1px 2px #000"}}
								>
									"#1 Best PS4 Game of 2018" &nbsp; <span style={{color: "#f00"}}>-Metacritic</span>
								</p>
								</Fade>
								<Fade delay={1500}>
								<p 
									className="d-none d-md-block p-2"
									style={windowWidth === 768 ? {color: "#fff", textShadow: "1px 1px 1px #000"}:{color: "#000", textShadow: "1px 1px 2px #000"}}
								>
									"When the credits roll, you'll have created enough incredible memories to fill ten lesser games" &nbsp; <span style={{color: "#f00"}}>-Gamesradar</span>
								</p>
								</Fade>
							</div>
						</div>
					</div>		
				</div>
				<div
					className="p-5 d-md-block d-lg-flex sales-banner"
					style={{background: "rgba(31, 31, 31, 0.9)", color: "#fff", fontFamily: "Source Sans Pro", fontSize: "20px"}}
				>
					<Fade bottom>
						<p 
							className="font-weight-bold pb-2"
							style={windowWidth < 992 ? {margin: "auto 0", fontSize: "26px"}:{margin: "auto 0"}}
						>
							Now Available
						</p>
						<h5 className="mx-3 pb-2 d-none d-lg-flex" style={{margin: "auto 0"}}>|</h5>
						<p 
							className="font-weight-bold pb-2"
							style={{margin: "auto 0"}}	
						>
							Red Dead Redemption 2, an epic tale of life in America at the dawn of the modern age, has arrived for PlayStation 4.
						</p>
						<div style={{marginLeft: "auto"}}>
							<a 
								href="https://www.playstation.com/en-us/games/red-dead-redemption-2-ps4/"
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