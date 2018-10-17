import React from "react"

class NewRoomForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			roomName: ""
		}
		this.handleOnChange = this.handleOnChange.bind(this)
		this.handleOnSubmit = this.handleOnSubmit.bind(this)
	}

	handleOnChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleOnSubmit = (event) => {
		event.preventDefault()
		this.props.createRoom(this.state.roomName)
		this.setState({
			roomName: ""
		})
	}

	render(){
		return(
			<div>
				{this.props.user.id && (
					<div style={{width: "100%"}}>
						<form onSubmit={this.handleOnSubmit}>
							<button 
								className="btn btn-success btn-md rounded-0"
								style={{float: "right", padding: "0.6rem 1.0rem"}} 
								>
								<i className="fa fa-location-arrow"></i>
							</button>
							<div style={{overflow: "hidden"}}>				
								<input
									name="roomName"
									value={this.state.roomName}
									onChange={this.handleOnChange}
									type="text"
									placeholder="Add New Channel"
									className="p-2"
									style={{border: "2.5px solid #9a9a9a", width: "100%"}}
									required
								/>
							</div>
						</form>
					</div>
				)}
			</div>
		)
	}
}

export default NewRoomForm