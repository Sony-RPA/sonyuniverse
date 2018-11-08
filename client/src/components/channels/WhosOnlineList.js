import React from "react"

class WhosOnlineList extends React.Component{
	render(){
		return(
			<div 
				className={this.props.users && "mb-4"}
			>
				{this.props.users && (
					<div>
						<div className="d-flex justify-content-between text-light mb-2">
							<h6 className="font-weight-bold">Members</h6><i className="fa fa-users ml-2"></i>
						</div>
						<ul style={{listStyle: "none", overflow: "scroll", overflowX: "hidden", maxHeight: "27vh"}} className="p-2">
							{this.props.users.map((user, index) => {
								return(
									<li 
										key={index}
										className={user.presence.state === "online" ? "text-success font-weight-bold mb-2" : (
											"text-muted font-weight-bold mb-2"
										)}
									>
										<i className="fa fa-circle mr-2"></i>{user.name}
									</li>
								)
							})}
						</ul>
					</div>
				)}
			</div>
		)
	}
}

export default WhosOnlineList