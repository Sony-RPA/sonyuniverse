import React from "react"
import Comment from "./Comment"

const Comments = ({ comments, videoId }) => {
    const renderComments = () => {
        return comments.map((comment) => <Comment comment={comment} videoId={videoId}/>)
    }

    return (
        <div>{renderComments()}</div>
    )
}

export default Comments