import React from "react"

const Star = ({ areaFilled, handleClick, point, id }) => {

    let starType = ""

    if(areaFilled === 1){
        starType = "star-filled"
    } else if(areaFilled > 0){
        starType = "star-partially-filled"
    } else {
        starType = "star"
    }

    return(
        <span 
            className={`position-relative ${starType}`}
            onClick={() => handleClick(id, { stars: point })}
        >
            ☆
        </span>
    )
}

export default Star