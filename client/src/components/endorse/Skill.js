import React from "react"

class Skill extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			selected: false
		}
		this.handleOnClick = this.handleOnClick.bind(this)
	}

	handleOnClick = (event) => {
		this.setState((prevState) => {
			return{
				selected: !prevState.selected	
			}
		})
		this.props.handleEndorseSkill(this.props.skill)
	}

	render(){
		return(
			<div 
				className={this.state.selected ? (
					"col-lg-4 bg-success text-light border border-light rounded"
					) : "col-lg-4 bg-black text-light border border-light rounded" 
				}
				style={{fontSize: "14px"}}
				onClick={this.handleOnClick}
			>
				{this.state.selected ? <span><i className="fa fa-check-circle mr-1"></i></span> : null}
				{this.props.skill.name}
			</div>
		)
	}
}

export default Skill