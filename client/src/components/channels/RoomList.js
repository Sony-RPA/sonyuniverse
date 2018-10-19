import React from "react"

class RoomList extends React.Component{
	render(){
		const rooms = this.props.rooms.filter((room) => {
			return room !== undefined
		})

		const orderedRooms = [...rooms].sort((a, b) => {
			return a.id - b.id
		})
		return(
			<div>
				{ this.props.rooms.length > 0 ? (
					<div>
						<div className="d-flex justify-content-between text-light mb-2">
							<h6 className="font-weight-bold">Channels</h6><i className="fa fa-gamepad"></i>
						</div>
						<ul style={{listStyle: "none", overflow: "scroll", overflowX: "hidden", maxHeight: "27vh"}} className="p-2">
							{orderedRooms.map((room, index) => {
								return(
									<li key={index} className="font-weight-bold mb-2">
										<a	
											onClick={() => {
												this.props.subscribeToRoom(room.id)
											}} 
											href="#"
											className={room.id === this.props.roomId ? "text-success": "text-info"}
											style={{textDecoration: "none"}}
										>
											<span className="mr-2">#</span>{room.name}
										</a>
									</li>
								)
							})}
						</ul>				
					</div> 
				) : (
					<p className="text-muted p-2">Loading...</p>
				)}
			</div>
		)
	}
}

export default RoomList