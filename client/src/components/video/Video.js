import React, { useEffect } from "react"
import { getVideo } from "../../actions/videoActions"
import { connect } from "react-redux"
import VideoPage from "./VideoPage"
import Spinner from "../common/Spinner"

const Video = ({ video, getVideo, match }) => {
    const { video: thisVideo, loading } = video

    useEffect(() => {
        const id = match.params.id
        getVideo(id)
    }, [])

    let videoContent

    if(loading || Object.keys(thisVideo).length === 0 || thisVideo === null){
        videoContent = <Spinner/>
    } else {
        videoContent = (
            <div>
                <VideoPage video={thisVideo}/>
            </div>
        )
    }

    return(
        <div className="video">
            <div className="container">
                {videoContent}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        video: state.video
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVideo: (videoId) => {
            dispatch(getVideo(videoId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Video)