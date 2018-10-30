import React from "react"
import { connect } from "react-redux"
import Moment from "react-moment"
import { deleteExperience } from "../../actions/profileActions"

class Experience extends React.Component{
	constructor(props){
		super(props)

		this.onDeleteClick = this.onDeleteClick.bind(this)
	}

	onDeleteClick = (id) => {
		this.props.deleteExperience(id)
	}

	render(){
		const experience = this.props.experience.map((exp) => {
			return(
				<tr key={exp._id}>
					<td className="bg-light">{exp.company}</td>
					<td className="bg-light">{exp.title}</td>
					<td className="d-none d-md-table-cell bg-light">
						<Moment format="YYYY/MM/DD">{exp.from}</Moment> - 
						{exp.to === null ? " Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
					</td>
					<td className="bg-light">
						<button
					 		className="btn btn-danger"
					 		onClick={() => {
					 			this.onDeleteClick(exp._id)
					 		}}
					 	>Delete
					 	</button>
					 </td>
				</tr>
			) 
		})
		
		return(
			<div className="mt-5 mb-5">
				<h4 className="mb-4">
					Experience Credentials
				</h4>
				<table className="table shadow">
					<thead>
						<tr>
							<th className="bg-black border-0 text-white">Company</th>
							<th className="bg-black border-0 text-white">Title</th>
							<th className="bg-black border-0 d-none d-md-table-cell text-white">Years</th>
							<th className="bg-black border-0 text-white"></th>
						</tr>
						{experience}
					</thead>
				</table>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		deleteExperience: (id) => {
			dispatch(deleteExperience(id))
		}
	}
}

export default connect(null, mapDispatchToProps)(Experience)