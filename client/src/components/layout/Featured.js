import React from "react"
import { Fade } from "react-reveal"
import message1 from "../../img/message-1.png"
import message2 from "../../img/message-2.png"
import message3 from "../../img/message-3.png"
import sp_logo from "../../img/sp-logo.png"
import { Slide } from "react-reveal"

class Featured extends React.Component{
	constructor(){
		super()
		this.state = {
			messages: [message1, message2, message3],
			asset: "",
			delay: [1000, 6500, 7000],
			initialScore: 16170,
			updatedScore: 16300,
			showScore: false
		}
	}

	componentDidMount(){
		this.setState({
			asset: "https://i.imgur.com/FSWUXBR.mp4"
		})
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
				className="featured px-4 py-5 d"
				style={{fontFamily: "montserrat"}}
			>
				<Fade>
					<h1 className="featured_title text-light mb-4">Highlight of the week</h1>
					<div 
						className="row"
						style={{border: "5px solid #fff"}}
					>
						<div className="col-md-4 bg-light p-0">
							<div style={{ height: "100%"}}>
								<h4 className="room-title text-light p-3">SP Squad #5</h4>
								{this.state.messages.map((message, i) => {
									return(
										<Slide bottom delay={this.state.delay[i]}>
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
							<video
								style={{ height: "100%", width: "100%" }} 
								onEnded={this.showScore}
								autoPlay
								autobuffer
								playsinline 
								muted
							>
								<source 
									src={this.state.asset} 
									type="video/mp4"
								/>
							</video>
						</div>

						{ this.state.showScore ? (
							<Fade left>
								<div 
									className="col-md-4 font-weight-bold bg-dark p-0" 
								>
									<div className="scoreboard font-weight-bold text-warning p-4">
										<h2 className="mb-4 font-weight-bold bg-warning text-dark shadow">VICTORY</h2>
										<div className="container">
											<div className="row">
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
														className="d-block d-sm-none d-md-block mt-4"
														style={{margin: "auto"}}
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
												src="https://media.licdn.com/dms/image/C5603AQHNh_F49XSM0A/profile-displayphoto-shrink_800_800/0?e=1543449600&v=beta&t=jxzTdPe5_IhN34_i4LYwHkVW4LuKFwvoClcmKW0LEeY"
												className="rounded-circle"
												style={{width: "50%", maxWidth: "120px", alignSelf: "center", boxShadow: "0px 3px 3px #000"}}

											/>
											<img
												src="http://www.stickpng.com/assets/images/5b43b818e99939b4572e32ab.png"
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

export default Featured