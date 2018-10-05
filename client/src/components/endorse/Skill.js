import React from "react"
import { connect } from "react-redux"

class Skill extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			endorsed: false
		}
		this.handleOnClick = this.handleOnClick.bind(this)
	}

	componentDidMount(){
		const currentUser = this.props.auth.user.id
		const endorsements = this.props.skill.endorsements
		if(endorsements.includes(currentUser)){
			this.setState({
				endorsed: true
			})
		}
	}

	handleOnClick = (event) => {
		this.setState((prevState) => {
			return{
				endorsed: !prevState.endorsed
			}

		})		
		this.props.handleEndorseSkill(this.props.skill)
	}

	render(){
		return(
			<div 
				className={this.state.endorsed ? (
					"col-lg-4 col-sm-6 bg-success text-light border border-light rounded"
					) : "col-lg-4 col-sm-6 bg-black text-light border border-light rounded" 
				}
				style={{fontSize: "14px"}}
				onClick={this.handleOnClick}
			>
				{this.state.endorsed ? <span><i className="fa fa-check-circle mr-1"></i></span> : null}
				{this.props.skill.name}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return{
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Skill)