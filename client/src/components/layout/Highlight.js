import React from "react"
import { Fade } from "react-reveal"
import message1 from "../../img/message-1.png"
import message2 from "../../img/message-2.png"
import message3 from "../../img/message-3.png"
import fortnite from "../../img/fortnite.png"
import sp_logo from "../../img/sp-logo.png"
import { Slide } from "react-reveal"
import LazyLoad from "react-lazyload"

class Highlight extends React.Component{
	constructor(){
		super()
		this.state = {
			messages: [message1, message2, message3],
			asset: "https://i.imgur.com/FSWUXBR.mp4",
			delay: [1000, 6500, 7000],
			initialScore: 16170,
			updatedScore: 16300,
			showScore: false
		}
	}

	componentDidUpdate(){
		if(this.state.showScore){
			setTimeout(() => {
				this.updateScore()
			}, 30)
		}
	}

	updateScore = () => {
		if(this.state.initialScore === 16170){
			//wait 3 seconds before starting first update
			setTimeout(() => {
				this.setState({
					initialScore: this.state.initialScore + 1,
				})
			}, 3000)
		} else if(this.state.initialScore < this.state.updatedScore){
			this.setState({
				initialScore: this.state.initialScore + 1
			})
		}
	}

	showScore = () => {
		this.setState({
			showScore: true
		})
	}

	render(){
		return(
			<div
				className="highlight px-4 py-5 d"
				style={{fontFamily: "montserrat"}}
			>
				<Fade>
					<h1 className="highlight_title text-light mb-4">Highlight of the week</h1>
					<div 
						className="row"
						style={{border: "5px solid #fff"}}
					>
						<div className="col-md-4 bg-light p-0">
							<div style={{ height: "100%"}}>
								<h4 className="room-title text-light p-3">SP Squad #5</h4>
								{this.state.messages.map((message, i) => {
									return(
										<Slide key={i} bottom delay={this.state.delay[i]}>
											<div className="pl-2">
												<Fade delay={this.state.delay[i]}>
													<img style={{width: "15rem"}}src={message}/>
												</Fade>
											</div>
										</Slide>
									)
								})}
							</div>
						</div>

						<div className="col-md-4 bg-black p-0">
							<LazyLoad height={355}>
								<Fade>
									<video
										style={{ height: "100%", width: "100%" }} 
										onEnded={this.showScore}
										autoPlay
										autobuffer="true"
										playsInline 
										muted
									>
										<source 
											src={this.state.asset} 
											type="video/mp4"
										/>
									</video>
								</Fade>
							</LazyLoad>
						</div>

						{ this.state.showScore ? (
							<Fade left>
								<div 
									className="col-md-4 font-weight-bold bg-dark p-0" 
								>
									<div className="scoreboard font-weight-bold sony-text-gold p-4">
										<h2 className="mb-4 font-weight-bold sony-background-gold text-dark shadow">VICTORY</h2>
										<div className="container">
											<div className="row" style={{marginTop: "5px"}}>
												<div className="col-sm-6 col-md-12 col-lg-6 p-0">
													<h5 className="font-weight-bold mb-2">Total Points</h5>
													<div 
														className="scoreboard_circle rounded-circle text-center px-2 py-3"
														style={{border: "6px solid #ffc107"}}
													>
														<span 
															className="scoreboard_total font-weight-bold h2"
														>
															{this.state.initialScore}
														</span>
													</div>
												</div>
												<div className="col-sm-6 col-md-12 col-lg-6 px-3 text-left">
													<div className="d-none d-sm-block d-md-none d-lg-block">
														<Fade left delay={1000}>
															<div className="mt-5">
																<i className="fas fa-star mr-1"></i>
																<span>Victory Royale &nbsp; +100</span>
															</div>
														</Fade>
														<Fade left delay={1500}>
															<div>
																<i className="fas fa-star mr-1"></i>
																<span>Squad-Up! &nbsp; +20</span>
															</div>
														</Fade>
														<Fade left delay={2000}>
															<div>
																<i className="fas fa-star mr-1"></i>
																<span>Final Blitz &nbsp; +10</span>
															</div>
														</Fade>															
													</div>														
												</div>
												<Fade left delay={2500}>
													<div 
														className="d-block d-sm-none d-md-block"
														style={{margin: "auto", marginTop: "46px"}}
													>
														<i className="fas fa-star mr-1"></i>
														<span className="mr-2">Earned Rewards</span>
														<span>+130</span>
													</div>
												</Fade>
											</div>
										</div>
									</div>
								</div>
							</Fade>
							) : (
								<div className="col-md-4 p-0">
									<div className="spotlight text-warning px-2 py-4">
										<div className="team_item" style={{display: "inline-block"}}>
											<div 
												className="team_icon_square_large_animate m-4"
											>
												<img 
													src={sp_logo}
													style={{transform: "rotate(-45deg)", position: "relative", width: "50%", left: "-3px", top: "20px"}}
												/>
											</div>
										</div>
										<div 
											className="text-center px-2 pt-0 pb-3"
											style={{display: "flex", justifyContent: "space-around"}}
										>
											<img 
												src="https://s3-us-west-1.amazonaws.com/co-directory-images/angelinafjimenez.jpg"
												className="rounded-circle"
												style={{width: "50%", maxWidth: "120px", alignSelf: "center", boxShadow: "0px 3px 3px #000"}}

											/>
											<img
												src={fortnite}
												style={{width: "50%", maxWidth: "150px", alignSelf: "center"}}												
											/>											
										</div>
									</div>
								</div>
							)
						}

					</div>
				</Fade>
			</div>
		)
	}
}

export default Highlight