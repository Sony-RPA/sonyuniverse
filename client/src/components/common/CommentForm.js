import React from "react"
import TextFieldGroup from "./TextFieldGroup"
import Spinner from "./Spinner"

class CommentForm extends React.Component{
    state = {
        text: "",
        active: false
    }

    componentDidUpdate(prevProps, prevState){
        //clear text if there is no error, one condition needs to pass
        //if there was initially an error and no longer an error, clear text.
        //if comment submission was successful and text-state has more than one character
        if((prevProps.error !== this.props.error && !this.props.error) || 
            (prevState.text === this.state.text && this.state.text.length > 1)){
            this.setState({
                text: ""
            })
        }
    }

    createButtons = () => {
        const { text } = this.state
        return (
            <div className="d-flex justify-content-end">
                <button 
                    className="btn btn-light btn-md rounded-0 mr-3"
                    type="text"
                    onClick={this.disableInput}
                >
                    Cancel
                </button>
                <button 
                    className={`btn btn-md rounded-0 ${text.length === 0 ? `btn-secondary` : `btn-primary`}`}
                    type="submit"
                    disabled={text.length === 0 ? true : false}
                >
                    Comment
                </button>
            </div>
        )
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    enableInput = () => {
        const { text } = this.state
        if(!text.length){
            this.setState({
                active: true
            })
        }
    }

    disableInput = () => {
        const { onCancel } = this.props

        this.setState({
            text: "",
            error: "",
            active: false
        })
        //clear errors in redux state
        onCancel()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { onSubmit, id } = this.props
        const { text } = this.state
        const commentData = {
            text: text
        }
        //trigger action creator passed from parent
        onSubmit(id, commentData)
    }

    createContent = () => {
        const { title, asset, error, loading } = this.props
        const { active, text } = this.state
        let content

        if(loading){
            content = <Spinner/>
        } else {
            content = (
                <div>
                    <p>{title}</p>
                    <div className="d-flex">
                        { asset && <img src={asset} className="rounded-circle small-avatar mr-2"/>}
                        <form onSubmit={this.handleSubmit}>
                            <TextFieldGroup
                                placeholder="Add a public comment..."
                                name="text"
                                value={text}
                                onClick={this.enableInput}
                                onChange={this.handleChange}
                                autoComplete="off"
                                error={error}
                            />
                        { active && this.createButtons() }
                        </form>
                    </div>
                </div>
            )
        }

        return content
    }

    render(){
        return(
            <div className="comment-form">
                {this.createContent()}
            </div>
        )
    }

}

export default CommentForm