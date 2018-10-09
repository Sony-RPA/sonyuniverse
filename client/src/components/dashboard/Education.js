import React from "react"
import { connect } from "react-redux"
import Moment from "react-moment"
import { deleteEducation } from "../../actions/profileActions"

class Education extends React.Component{
	constructor(props){
		super(props)

		this.onDeleteClick = this.onDeleteClick.bind(this)

	}

	onDeleteClick = (id) => {
		this.props.deleteEducation(id)
	}

	render(){
		const education = this.props.education.map((edu) => {
			return(
				<tr key={edu._id}>
					<td>{edu.school}</td>
					<td>{edu.degree}</td>
					<td>
						<Moment format="YYYY/MM/DD">{edu.from}</Moment> - 
						{edu.to === null ? " Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
					</td>
					<td>
						<button
					 		className="btn btn-danger"
					 		onClick={() => {
					 			this.onDeleteClick(edu._id)
					 		}}
					 	>Delete
					 	</button>
					 </td>
				</tr>
			) 
		})
		return(
			<div>
				<h4 className="mb-4">
					Education Credentials
				</h4>
				<table className="table border shadow">
					<thead>
						<tr>
							<th className="bg-black text-white">School</th>
							<th className="bg-black text-white">Degree</th>
							<th className="bg-black text-white">Years</th>
							<th className="bg-black text-white"></th>
						</tr>
						{education}
					</thead>
				</table>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		deleteEducation: (id) => {
			dispatch(deleteEducation(id))
		}
	}
}

export default connect(null, mapDispatchToProps)(Education)