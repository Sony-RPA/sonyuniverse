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
			//remove endorsement if already exists in array
			if(prevState.endorsedSkills.includes(skill)){
				return{
					endorsedSkills: prevState.endorsedSkills.filter(endorsedSkill => endorsedSkill !== skill)
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
				style={{
					overlay: {
						background: "rgba(0, 0, 0, 0.3)",
					},
					content: {
						fontFamily: "montserrat",
						minHeight: "10rem",
						top: "35%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						transform: 'translate(-50%,-50%)',
						width: "40%",
						textAlign: "center"
	      			}
				}}
			>
				<h4 className="mb-3">Endorse {colleagueName} for their skills: </h4>
				<div className="container">
					<div className="row">
						{skills}
					</div>
					<button 
						className="btn btn-dark btn-md mt-3"
						onClick={this.props.handleEndorseColleague}
					>
						Done
					</button>
				</div>
			</Modal>			
		)
	}
}

export default EndorseModal