import React, { useState } from "react"
import formatTimestamp from "../../utils/formatTimestamp"
import { deleteComment } from "../../actions/videoActions"
import { connect } from "react-redux"

const Comment = ({ comment, auth, videoId, deleteComment }) => {
    const [ active, setActive ] = useState(false)
    const [ toggle, setToggle ] = useState(false)
    const { _id: commentId, date, text, user: { avatar, name, _id: userId }} = comment

    const handleDeleteComment = () => {
        deleteComment(videoId, commentId)
        setToggle(false)
    }

    const renderButtons = () => {
        return (
            <div>
                { auth.user.id === userId ? (
                    <div className="py-2">
                        <div 
                            className="dropdown-item"
                            onClick={handleDeleteComment}
                        >
                            <i className="far fa-times-circle"></i><span className="ml-2">Delete</span>
                        </div>                    
                    </div>                        
                ) : (
                    <div className="py-2">
                        <div className="dropdown-item">
                            <i className="fas fa-flag"></i><span className="ml-2">Report</span>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div 
            className="d-flex mb-4"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => {
                setActive(false)
                setToggle(false)
            }}
        >
            <img src={avatar} className="rounded-circle small-avatar mr-2"/>
            <div className="video-comment px-2">
                <div className="d-flex">
                    <span className="d-flex align-items-center">{name}</span>
                    <span className="d-flex align-items-center mx-2"><i className="fas fa-dot-circle small-icon"></i></span>
                    <small className="text-secondary d-flex align-items-center">{formatTimestamp(date)}</small>
                </div>
                <div className="py-2">
                    {text}
                </div>
            </div>
            <div className={`comment-dropdown ml-auto ${active ? "d-block" : "d-none"}`}>
                <span 
                    className="d-flex align-items-center mx-2 mt-3 btn btn-sm"
                    onClick={() => setToggle(true)}
                >
                    <i className="fas fa-ellipsis-v text-secondary"></i>
                </span>
                <div className={`dropdown-content ${toggle ? "d-block" : "d-none"}`}>
                    {renderButtons()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (videoId, commentId) => {
            dispatch(deleteComment(videoId, commentId))            
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)