import React from "react"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import MessageForm from "../message/MessageForm"
import MessageFeed from "../message/MessageFeed"

const SideDrawer = (props) => {
	return(
		<div className="d-flex">
			<Drawer
				anchor="left"
				open={props.open}
				onClose={() => (props.toggleDrawer())}
			>
				<div style={{flex: "1"}}>
					<MessageFeed/>
				</div>
				<div>
					<MessageForm/>
				</div>
			</Drawer>
		</div>
	)
}

export default SideDrawer