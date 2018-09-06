import React from "react"
import axios from "axios"

class ProfileGithub extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			clientId: "97bcad5ef368785ac13b",
			clientSecret: "594385b1f848d64622ab162e70c22c58798f3146",
			count: 5,
			sort: "created: asc",
			repos: []
		}
	}

	componentDidMount(){
		const username = this.props.username
		const { count, sort, clientId, clientSecret } = this.state

		//transformRequest allows us to remove headers on a single request.
		axios.get(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`, {
			transformRequest: [(data, headers) => {
    				delete headers.common.Authorization
    				return data
				}]			
			})
			.then(res => {
				if(this.refs.myRef){
					this.setState({
						repos: res.data
					})
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	render(){
		const repos = this.state.repos

		const repoItems = repos.map((repo) => {
			return(
				<div key={repo.id} className="card card-body mb-2">
					<div className="row">
						<div className="col-md-6">
							<h4>
								<a href={repo.html_url} className="text-info">{repo.name}</a>
							</h4>
							<p>{repo.description}</p>
						</div>
						<div className="col-md-6">
							<span className="badge badge-info mr-1">
								Stars: {repo.stargazers_count}
							</span>
							<span className="badge badge-secondary mr-1">
								Watchers: {repo.watchers_count}
							</span>
							<span className="badge badge-success">
								Forks: {repo.forks_count}
							</span>														
						</div>
					</div>
				</div>
			)
		})
		return(
			<div ref="myRef">
				<hr/>
				<h3 className="mb-4">Latest Github Repositories</h3>
				{repoItems}
			</div>
		)
	}
}

export default ProfileGithub