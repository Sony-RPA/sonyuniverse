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
		const endorseIcon = this.state.endorsed ? "fa fa-check-circle mr-1" : "fa fa-plus-circle mr-1"
		return(
			<div 
				className={this.state.endorsed ? (
					"col-lg-4 col-sm-6 bg-success text-light border border-dark rounded transition-med"
					) : "col-lg-4 col-sm-6 bg-black text-light border border-dark rounded transition-med" 
				}
				style={{fontSize: "14px"}}
				onClick={this.handleOnClick}
			>
				<span key={Math.random()}>
					<i className={endorseIcon}></i>
				</span>
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