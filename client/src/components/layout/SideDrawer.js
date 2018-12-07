import React from "react"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import MessageForm from "../message/MessageForm"
import MessageFeed from "../message/MessageFeed"

const SideDrawer = (props) => {
	return(
		<div>
			<Drawer
				anchor="left"
				open={props.open}
				onClose={() => (props.toggleDrawer())}
			>
				<MessageFeed/>
				<MessageForm/>
			</Drawer>
		</div>
	)
}

export default SideDrawer