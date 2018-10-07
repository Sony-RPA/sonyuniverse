import React from "react"
import Modal from "react-modal"
import Skill from "./Skill"

class EndorseModal extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			endorsedSkills: []
		}

		this.handleEndorseSkill = this.handleEndorseSkill.bind(this)
	}

	handleEndorseSkill = (skill) => {
		this.setState((prevState) => {
			//remove endorsedSkill if the user deselects a skill they initally selected.
			if(prevState.endorsedSkills.includes(skill)){
				return{
					endorsedSkills: prevState.endorsedSkills.filter((endorsedSkill) => {
						return endorsedSkill !== skill
					})
				}	
			}
			else {
				return{
					endorsedSkills: [...prevState.endorsedSkills, skill]
				}
			}
		})
	}

	render(){
		const colleagueName = this.props.profile.user.name
		const skills = this.props.profile.skills.map((skill, index) => {
			return <Skill key={index} skill={skill} handleEndorseSkill={this.handleEndorseSkill}/>
		})

		return(
			<Modal
				isOpen={this.props.modalOpen}
				ariaHideApp={false}
				style={{
					overlay: {
						background: "rgba(0, 0, 0, 0.3)",
					},
					content: {
						background: "rgba(31, 31, 31, .85)",
						fontFamily: "montserrat",
						minHeight: "10rem",
						top: "35%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						transform: 'translate(-50%,-50%)',
						width: "40%",
						border: "none",
						textAlign: "center"
	      			}
				}}
			>
				<h4 className="mb-3 text-light">Endorse {colleagueName} for their skills: </h4>
				<div className="container">
					<div className="row">
						{skills}
					</div>
					<p className="text-muted mt-5 mb-2" style={{fontSize: "11px"}}>
						Please press submit to finalize your updates.
					</p>
					<button 
						className="btn btn-primary btn-md mr-1"
						onClick={() => {
							this.props.handleEndorseColleague(this.props.profile.user._id, this.state.endorsedSkills)
						}}
					>
						Submit
					</button>
					<button
						className="btn btn-dark btn-md"
						onClick={this.props.handleEndorseModalOpen}
					>
						Close
					</button>
				</div>
			</Modal>			
		)
	}
}

export default EndorseModal