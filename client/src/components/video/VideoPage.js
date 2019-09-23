import React, { useState, useEffect } from "react"
import YouTube from "react-youtube"
import Tags from "../common/Tags"
import Ratings from "./Ratings"
import CommentForm from "../common/CommentForm"
import Comments from "./Comments"
import formatTimestamp from "../../utils/formatTimestamp"
import { addComment, clearErrors } from "../../actions/videoActions"
import { addRating } from "../../actions/videoActions"
import { connect } from "react-redux"

const VideoPage = ({ video, thisUser, errors, addRating, addComment, clearErrors, thisVideo }) => {
    const { _id: videoId, urlPath, title, description, tags, views, user, date, rating, comments } = video
    const { avatar } = thisUser
    const [ containerWidth, setContainerWidth ] = useState(0)
    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth)

    const youtubeVideoId = urlPath.slice(urlPath.indexOf("=") + 1)

    const containerRef = React.createRef()

    const options = {
		height: "400",
		width: `${containerWidth}`,
		playerVars: {
			autoPlay: 1
		}
    }

    const getAverageRating = () => {
        let total = rating.reduce((acc, curr) => acc + curr.stars, 0)
        let average = total/rating.length
        return average
    }

    //update container width so youtube-player can use value
    useEffect(() => {
        if(containerRef.current){
            setContainerWidth(containerRef.current.offsetWidth)
        }
    }, [windowWidth])

    //use to keep track and update of window width
    useEffect(() => {
        window.addEventListener("resize", function(containerRef){
            setWindowWidth(window.innerWidth)
        })
    }, [])

    return (
		<div className="video">
            <div className="row">
                <div
                    ref={containerRef} 
                    className="col-md-8 px-0 m-auto">
                    <YouTube
                        videoId={youtubeVideoId}
                        opts={options}
                    />
                    <div className="card card-body shadow mt-4 mb-1">
                        <div className="d-flex justify-content-between">
                            <h4 className="mt-2 mb-3">{title}</h4>
                            <div>
                                <Ratings average={getAverageRating()} addRating={addRating} videoId={videoId}/>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <img src={user.avatar} className="rounded-circle small-avatar mr-2"/>
                            <span className="d-flex align-items-center">{user.name}</span>
                            <span className="d-flex align-items-center mx-2"><i className="fas fa-dot-circle small-icon"></i></span>
                            <small className="text-secondary d-flex align-items-center">{formatTimestamp(date)}</small>
                            <span className="d-flex align-items-center mx-2"><i className="fas fa-dot-circle small-icon"></i></span>
                            <small className="text-secondary d-flex align-items-center">{views} Views</small>
                        </div>                        
                        <p>{description}</p>
                        <div className="my-3">
                            <Tags
                                tags={tags}
                                editable={false}
                            />
                        </div>
                    </div>
                    <div className="card card-body shadow my-1">
                        <div className="my-2">
                            <CommentForm
                                id={videoId}
                                title={`${comments.length} Comments`}
                                loading={thisVideo.commentLoading}
                                asset={avatar}
                                error={errors.text}
                                onSubmit={addComment}
                                onCancel={clearErrors}
                            />   
                        </div>
                    </div>
                    <div className="card card-body shadow my-1">
                        <div className="my-2">
                            <Comments videoId={videoId} comments={comments}/>
                        </div>
                    </div>                                         
                </div>
            </div>
		</div>
    )
}


const mapStateToProps = (state) => {
    return { 
        thisUser: state.auth.user,
        thisVideo: state.video,
        errors: state.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRating: (videoId, stars) => {
            dispatch(addRating(videoId, stars))
        },
        addComment: (videoId, commentData) => {
            dispatch(addComment(videoId, commentData))
        },
        clearErrors: () => {
            dispatch(clearErrors())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage)