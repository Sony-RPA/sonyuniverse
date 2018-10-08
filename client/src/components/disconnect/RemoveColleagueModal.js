import React from "react"
import Modal from "react-modal"

class RemoveColleagueModal extends React.Component{
	render(){
		const colleagueName = this.props.profile.user.name
		return(
			<Modal
				isOpen={this.props.modalOpen}
				ariaHideApp={false}
				style={{
					overlay: {
						background: "rgba(0, 0, 0, 0.3)",
					},
					content: {
						background: "rgba(31, 31, 31, .85)",
						fontFamily: "montserrat",
						minHeight: "10rem",
						top: "35%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						transform: 'translate(-50%,-50%)',
						width: "40%",
						border: "none",
						textAlign: "center"
					}
				}}
			>
				<h4 className="mb-5 text-light">Are you sure you want to remove 
					<span className="text-warning"> {colleagueName} </span>
					 from your network?
				</h4>
				<button
					className="btn btn-danger btn-md mr-1"
					onClick={this.props.handleRemoveColleague}
				>
					Remove
				</button>
				<button 
					className="btn btn-dark btn-md"
					onClick={this.props.handleRemoveColleagueModalOpen}
				>
					Cancel
				</button>
			</Modal>
		)
	}
}

export default RemoveColleagueModal