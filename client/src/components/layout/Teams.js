import React from "react"
import { Zoom } from "react-reveal"
import ps_logo from "../../img/ps-logo.png"
import sp_logo from "../../img/sp-logo.png"
import sm_logo from "../../img/sm-logo.png"
import sony_logo from "../../img/sony-logo.png"
import crackle_logo from "../../img/crackle-logo.png"


class Teams extends React.Component{
	constructor(){
		super()
		this.state = {
			teams: ["Playstation", "Pictures", "Music", "Electronics", "Mobile", "Crackle"],
			members: [7293, 7985, 8358, 9134, 8560, 60],
			colors: ["#0072CE", "#15c1b3", "#a31010", "#0fa25e", "#911fa3", "#ffae00"],
			logos: [ps_logo, sp_logo, sm_logo, sony_logo, sony_logo, crackle_logo]
		}
	}
	render(){
		return(
			<div className="teams text-light">
				<div className="container text-center">
					<h1 className="mb-5">Great people. Greater teams.</h1>
					<div className="row">
						{this.state.teams.map((team, i) => {
							return(
								<Zoom>
									<div className="col-sm-12 col-sm-12 col-md-4">
										<div className="team_item">
											<div className="team_outer">
												<div className="team_inner">
													<div 
														className="team_icon_square" 
														style={{backgroundColor: `${this.state.colors[i]}`}}>
													</div>
													<div
														className="team_icon"
														style={{background: `url(${this.state.logos[i]})`}}
														>
													</div>
													<div className="team_title">{team}</div>
													<div className="team_desc">
														<span 
															className="fa fa-user-circle mr-2"
															style={{color: this.state.colors[i]}}
														>
														</span>
														{this.state.members[i]}
													</div>
												</div>
											</div>
										</div>
									</div>
								</Zoom>
							)
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default Teams