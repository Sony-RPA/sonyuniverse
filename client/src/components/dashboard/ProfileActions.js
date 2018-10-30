import React from "react"
import { Link } from "react-router-dom"

class ProfileActions extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			width: 0,
			height: 0
		}
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
	}

	componentDidMount(){
		this.updateWindowDimensions()
		window.addEventListener("resize", this.updateWindowDimensions)
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.updateWindowDimensions)
	}

	updateWindowDimensions = () => {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		})
	}

	render(){
		let actionsList
		let screenWidth = this.state.width
		if(screenWidth >= 768){
			actionsList = (
				<div className="btn-group" role="group">
					<Link to="/edit-profile" className="btn btn-dark bg-black shadow">
						<i className="fas fa-user-circle text-info mr-1"></i>
						Edit Profile
					</Link>
					<Link to="/edit-avatar" className="btn btn-dark bg-black shadow">
						<i className="fas fa-camera text-info mr-1"></i>
						Edit Avatar
					</Link>			
					<Link to="/add-experience" className="btn btn-dark bg-black shadow">
						<i className="fab fa-black-tie text-info mr-1"></i>
						Add Experience
					</Link>			
					<Link to="/add-education" className="btn btn-dark bg-black shadow">
						<i className="fas fa-graduation-cap text-info mr-1"></i>
						Add Education
					</Link>			
				</div>
			)
		} else {
			actionsList = (
				<div className="text-center">
					<h5 
						data-toggle="collapse" 
						data-target="#profileActions"
						className="bg-black text-light p-3 mb-0 shadow"
					>
						<i className="fas fa-chess-rook text-warning mr-2"></i>Actions
					</h5>					
					<div id="profileActions" className="collapse">
						<Link 
							to="/edit-profile"
							className="btn btn-dark bg-black d-block rounded-0 border-0 shadow"
						>
							<i className="fas fa-user-circle text-info mr-1"></i>
							Edit Profile
						</Link>
						<Link
							to="/edit-avatar"
							className="btn btn-dark bg-black d-block rounded-0 border-0 shadow"
						>
							<i className="fas fa-camera text-info mr-1"></i>
							Edit Avatar
						</Link>			
						<Link
							to="/add-experience"
							className="btn btn-dark bg-black d-block rounded-0 border-0 shadow"
						>
							<i className="fab fa-black-tie text-info mr-1"></i>
							Add Experience
						</Link>			
						<Link
							to="/add-education"
							className="btn btn-dark bg-black d-block rounded-0 border-0 shadow"
						>
							<i className="fas fa-graduation-cap text-info mr-1"></i>
							Add Education
						</Link>					
					</div>
				</div>
			)
		}
		return(
			<div>
				{actionsList}
			</div>
		)		
	}

}

export default ProfileActions
