import React from "react"
import TextFieldGroup from "./TextFieldGroup"


const SearchBar = ({text, handleOnChange, handleOnSubmit}) => {
	return(
		<form
			className="search-bar" 
			onSubmit={handleOnSubmit}
		>
			<div style={{ display: "flex" }}>
				<div style={{flex: "1"}}>
					<TextFieldGroup
						placeholder="Search"
						name="text"
						value={text}
						onChange={handleOnChange}
					/>
				</div>
				<div className="d-flex">							
					<button 
						type="submit" 
						className="btn btn-primary btn-md rounded-0"
						style={{height: "75%"}}
					>
						<i className="fas fa-search"></i>
					</button>
				</div>
			</div>
		</form>
	)
}

 export default SearchBar