const formatTimestamp = (timestamp) => {
    const dateString = new Date(timestamp).toLocaleDateString()
    const timeString = new Date(timestamp).toLocaleTimeString()

    return `${dateString} - ${timeString}`
}

export default formatTimestamp