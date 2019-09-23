import React from "react"
import Star from "../common/Star"

const Ratings = ({ average, addRating, videoId }) => {
    const stars = new Array(5).fill("").map((item, index) => {
        //CSS is causing the items to be aligned in opposite order
        let point = 5 - index
        //cases are completely filled > not filled at all > partially-filled
        let areaFilled = average >= point ? 1 : point - average >= 1 ? 0 : (point - average).toFixed(2)
        return (
            <Star 
                areaFilled={areaFilled} 
                handleClick={addRating} 
                point={point} 
                id={videoId}
            />
        )
    })

    return (
        <div className="rating">{stars}</div>
    )
}

export default Ratings