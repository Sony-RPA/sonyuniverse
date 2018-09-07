import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import authReducer from "../reducers/authReducer"
import errorReducer from "../reducers/errorReducer"
import profileReducer from "../reducers/profileReducer"
import postReducer from "../reducers/postReducer"
import thunk from "redux-thunk"

const initialStoreState = {}

const store = createStore(combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	post: postReducer
}), initialStoreState,
	composeWithDevTools(applyMiddleware(thunk)))

export default store
