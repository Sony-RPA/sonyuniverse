import React from "react"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import MessageForm from "../message/MessageForm"

const SideDrawer = (props) => {
	return(
		<div>
			<Drawer
				anchor="left"
				open={props.open}
				onClose={() => (props.toggleDrawer())}
			>
				<List component="nav">

				Hello
				</List>
				<MessageForm/>
			</Drawer>
		</div>
	)
}

export default SideDrawer