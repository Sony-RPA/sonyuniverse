import React, { useState, useEffect } from "react"

const TagInputGroup = (props) => {
	const [ selected, setSelected ] = useState(false)

	const containerRef = React.createRef()
	const inputRef = React.createRef()

	const { name, placeholder, value, 
			label, error, info, type, 
			onChange, tags, removeTag, 
			maxTags, onContainerClick, children } = props

	const handleAreaClick = () => {
		setSelected(true)
		onContainerClick()
		inputRef.current.focus()
	}

	const checkSelection = (e) => {
		if(e.target.className && typeof(e.target.className) == "string"){
			const validClasses = ["tag-input", "tag-editor-selected", "tag-editor", "video-tag"]
			const elementClasses = e.target.className.split(" ")

			if(!elementClasses.some((item) => validClasses.includes(item))){
				setSelected(false)
			}
		}
	}

	useEffect(() => {
		if(tags.length < maxTags){
			inputRef.current.focus()
		}
	}, [tags.length])

	useEffect(() => {
		window.addEventListener("click", checkSelection)
		return () => {
			window.removeEventListener("click", checkSelection)
		}
	}, [])

	return(
		<div 
			className="form-group mb-5"
			onClick={handleAreaClick}
			ref={containerRef}
		>
			<div className={`d-flex align-items-center form-control form-control-lg ${selected ? "tag-editor-selected" : "tag-editor"}`}>
				<span className="d-flex">
					{children}
				</span>
				<input
					name={name}
					type="text"
					value={value}
					onClick={handleAreaClick}
					autoComplete="off"
					onChange={onChange}
					className="border-0 pl-2 no-focus tag-input"
					placeholder={tags.length ? "" : placeholder}
					ref={inputRef}
					disabled={tags.length === maxTags}
				/>	
			</div>
			{ tags.length === maxTags && <small className="form-text text-success">You've reached the maximum number of tags (7).</small>}
	    	{ info && <small className="form-text text-muted">{info}</small> }
	    	{ error && <div className="invalid-feedback text-left">{error}</div>}						
		</div>

	)
}

export default TagInputGroup