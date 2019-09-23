import React from "react"

const Tags = ({ tags, removeTag, clickable }) => {
	return tags.map((tag, index) => {
		return (
			<span className="btn btn-dark btn-sm mr-1 my-1 video-tag" key={index}>
				{tag}{" "}
				{ clickable && (
					<span onClick={() => removeTag(index)}>
						<i className="fas fa-times-circle"></i>
					</span>
				)}
			</span>
		)
	})	
}

export default Tags