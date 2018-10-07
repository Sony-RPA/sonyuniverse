import React from "react"
import Moment from "react-moment"

class ProfileCreds extends React.Component{
	render(){
		const { experience, education } = this.props

		//get experience items
		const expItems = experience.map((exp) => {
			return(
				<li key={exp._id} className="list-group-item shadow">
					<h4>{exp.company}</h4>
					<p>
						<Moment format="YYYY/MM/DD">{exp.from}</Moment> -
						{exp.to === null ? (" Now") : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
					</p>
					<p><strong>Position: {exp.title}</strong></p>
					<p>
						{exp.location === "" ? null : (<span><strong>Location: </strong>{exp.location}</span>)}
					</p>
					<p>
						{exp.description === "" ? null : (<span><strong>Description: </strong>{exp.description}</span>)}
					</p>
				</li>
			)
		})

		//get edu items
		const eduItems = education.map((edu) => {
			return(
				<li key={edu._id} className="list-group-item shadow">
					<h4>{edu.school}</h4>
					<p>
						<Moment format="YYYY/MM/DD">{edu.from}</Moment> -
						{edu.to === "" ? (" Now") : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
					</p>
					<p><strong>Degree: {edu.degree}</strong></p>
					<p><strong>Field of Study:</strong> {edu.fieldofstudy}</p>
					<p>{edu.description === "" ? null : (<span><strong>Description: </strong> {edu.description}</span>)}</p>  
				</li>
			)
		})
		return(
			<div className="row">
				<div className="col-md-6">
					<h3 className="text-cemter text-info">Experience</h3>
					{ expItems.length > 0 ? (
						<ul className="list-group">{expItems}</ul>
					) : <p className="text-center">No Experience Listed</p>}
				</div>
				<div className="col-md-6">
					<h3 className="text-cemter text-info">Education</h3>
					{ eduItems.length > 0 ? (
						<ul className="list-group">{eduItems}</ul>
					) : <p className="text-center">No Education Listed</p>}
				</div>
			</div>
		)
	}
}

export default ProfileCreds