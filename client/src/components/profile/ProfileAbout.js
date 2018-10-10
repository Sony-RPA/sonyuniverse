import React from "react"
import isEmpty from "../../validation/is-empty"

class ProfileAbout extends React.Component{
	render(){
		const { profile } = this.props
		//Get first name
		const firstName = profile.user.name.trim().split(" ")[0]
		//Skill list
		const skills = profile.skills.map((skill, index) => {
			return(
				<div key={index} className="p-3">
					<i className="fa fa-check-circle mr-1 text-success"/>{skill.name}
				</div>
			)
		})

		return(
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="card card-body bg-dark mb-3 p-5 shadow">
                <h3 className="text-center text-info mb-4">{firstName}</h3>
                <p className="lead text-light">
                	{isEmpty(profile.bio) ? (<span>{firstName} does not have a bio</span>) : (<span>{profile.bio}</span>)}
                </p>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center text-light">
                  	{skills}
                  </div>
                </div>
              </div>
            </div>
          </div>
		)
	}
}

export default ProfileAbout